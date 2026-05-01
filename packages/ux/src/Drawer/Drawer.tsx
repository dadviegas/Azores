import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOverlay } from "../overlay/useOverlay.js";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerHeader,
  DrawerPanel,
  DrawerTitle,
  type DrawerSide,
} from "./Drawer.styles.js";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  width?: string;
  title?: ReactNode;
  children?: ReactNode;
  ariaLabel?: string;
  closeOnBackdrop?: boolean;
  showBackdrop?: boolean;
};

export const Drawer = ({
  open,
  onClose,
  side = "right",
  width = "320px",
  title,
  children,
  ariaLabel,
  closeOnBackdrop = true,
  showBackdrop = true,
}: DrawerProps): JSX.Element | null => {
  const panelRef = useRef<HTMLElement>(null);
  useOverlay({ open, onClose, lockBodyScroll: false });

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => panelRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [open]);

  // Without a backdrop there's nothing to catch outside clicks, so attach a
  // doc-level listener. Used by callers like Atlas that want the drawer to
  // float over the page (the dashboard stays visible/draggable) but still
  // dismiss on a click anywhere else.
  useEffect(() => {
    if (!open || showBackdrop || !closeOnBackdrop) return;
    const onDocPointerDown = (e: PointerEvent): void => {
      const panel = panelRef.current;
      if (!panel) return;
      if (panel.contains(e.target as Node)) return;
      onClose();
    };
    // Pointerdown (not click) so the close fires before any click handler on
    // the underlying element runs — clicking outside dismisses *and* lets the
    // user interact with the page in the same gesture.
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [open, showBackdrop, closeOnBackdrop, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      {showBackdrop ? (
        <DrawerBackdrop onClick={() => closeOnBackdrop && onClose()} />
      ) : null}
      <DrawerPanel
        ref={panelRef}
        $side={side}
        $width={width}
        role="dialog"
        aria-modal={showBackdrop ? "true" : undefined}
        aria-label={typeof title === "string" ? title : ariaLabel}
        tabIndex={-1}
      >
        {title ? (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        ) : null}
        <DrawerBody>{children}</DrawerBody>
      </DrawerPanel>
    </>,
    document.body,
  );
};
