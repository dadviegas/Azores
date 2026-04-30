import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Icon } from "@azores/ui";
import {
  ToastBody,
  ToastBox,
  ToastDismiss,
  ToastIcon,
  ToastMessage,
  ToastTitle,
  Viewport,
  type ToastKind,
} from "./Toast.styles.js";

export type Toast = {
  id: string;
  kind: ToastKind;
  title: string;
  message?: string;
  duration?: number;
};

export type ToastInput = Omit<Toast, "id"> & { id?: string };

type ToastContextValue = {
  push: (t: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const KIND_ICON: Record<ToastKind, string> = {
  info: "info",
  success: "check",
  warning: "warn",
  danger: "error",
};

export type ToastProviderProps = { children: ReactNode };

export const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (input: ToastInput): string => {
      const id = input.id ?? `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const toast: Toast = { duration: 4000, ...input, id };
      setToasts((prev) => [...prev, toast]);
      if (toast.duration && toast.duration > 0) {
        const timer = window.setTimeout(() => dismiss(id), toast.duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((t) => window.clearTimeout(t));
      map.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <Viewport role="region" aria-label="Notifications" aria-live="polite">
          {toasts.map((t) => (
            <ToastBox key={t.id} $kind={t.kind} role="status">
              <ToastIcon $kind={t.kind}>
                <Icon name={KIND_ICON[t.kind]} size={14} />
              </ToastIcon>
              <ToastBody>
                <ToastTitle>{t.title}</ToastTitle>
                {t.message ? <ToastMessage>{t.message}</ToastMessage> : null}
              </ToastBody>
              <ToastDismiss aria-label="Dismiss" onClick={() => dismiss(t.id)}>
                ✕
              </ToastDismiss>
            </ToastBox>
          ))}
        </Viewport>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be called inside <ToastProvider>");
  }
  return ctx;
};
