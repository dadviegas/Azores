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
