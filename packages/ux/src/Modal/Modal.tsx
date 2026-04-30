import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOverlay } from "../overlay/useOverlay.js";
import { Backdrop, Body, Dialog, Footer, Header, Title } from "./Modal.styles.js";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  width?: string;
  align?: "center" | "top";
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
  padded?: boolean;
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  width,
  align,
  closeOnBackdrop = true,
  closeOnEscape = true,
  ariaLabel,
  padded = true,
}: ModalProps): JSX.Element | null => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useOverlay({ open, onClose, closeOnEscape });

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      const focusable = dialogRef.current?.querySelector<HTMLElement>(
        "input, textarea, select, button, [tabindex]:not([tabindex='-1'])",
      );
      (focusable ?? dialogRef.current)?.focus();
    }, 30);
    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <Backdrop $align={align} onClick={() => closeOnBackdrop && onClose()}>
      <Dialog
        ref={dialogRef}
        $width={width}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : ariaLabel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <Header>
            <Title>{title}</Title>
          </Header>
        ) : null}
        <Body $padded={padded}>{children}</Body>
        {footer ? <Footer>{footer}</Footer> : null}
      </Dialog>
    </Backdrop>,
    document.body,
  );
};
