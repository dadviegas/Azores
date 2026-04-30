import { useEffect, useRef } from "react";

type Options = {
  open: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
};

// Shared overlay behavior: Escape closes, focus is restored when the overlay
// closes, and (optionally) body scroll is locked while open.
export const useOverlay = ({
  open,
  onClose,
  closeOnEscape = true,
  lockBodyScroll = true,
}: Options): void => {
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    return () => {
      lastFocused.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open || !lockBodyScroll) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, lockBodyScroll]);
};
