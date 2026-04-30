import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export type ToastKind = "info" | "success" | "warning" | "danger";

const KIND_BORDER: Record<ToastKind, string> = {
  info: tokens.ocean[400],
  success: tokens.moss[500],
  warning: tokens.amber[500],
  danger: tokens.coral[500],
};

const KIND_ICON_BG: Record<ToastKind, string> = {
  info: tokens.ocean[50],
  success: "#E9F1EC",
  warning: "#FBF2DD",
  danger: "#F8E5E5",
};

export const Viewport = styled.div({
  position: "fixed",
  bottom: tokens.s[6],
  right: tokens.s[6],
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  zIndex: tokens.z.toast,
  pointerEvents: "none",
});

export const ToastBox = styled.div<{ $kind: ToastKind }>(({ $kind }) => ({
  pointerEvents: "auto",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "flex-start",
  gap: tokens.s[3],
  minWidth: "280px",
  maxWidth: "380px",
  padding: `${tokens.s[3]} ${tokens.s[4]}`,
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderLeft: `3px solid ${KIND_BORDER[$kind]}`,
  borderRadius: tokens.r.md,
  boxShadow: tokens.shadow.lg,
  fontSize: tokens.fs.sm,
  animation: "az-toast-in 180ms var(--az-ease-out, ease-out)",
  "@keyframes az-toast-in": {
    from: { transform: "translateY(8px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
  },
}));

export const ToastIcon = styled.div<{ $kind: ToastKind }>(({ $kind }) => ({
  width: "28px",
  height: "28px",
  borderRadius: tokens.r.sm,
  background: KIND_ICON_BG[$kind],
  color: KIND_BORDER[$kind],
  display: "grid",
  placeItems: "center",
  flexShrink: 0,
}));

export const ToastBody = styled.div({
  minWidth: 0,
});

export const ToastTitle = styled.div({
  fontWeight: tokens.fw.semi,
  color: tokens.text,
});

export const ToastMessage = styled.div({
  marginTop: "2px",
  color: tokens.text2,
  fontSize: tokens.fs.xs,
  lineHeight: tokens.lh.snug,
});

export const ToastDismiss = styled.button({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: tokens.text3,
  cursor: "pointer",
  padding: tokens.s[1],
  borderRadius: tokens.r.xs,
  fontSize: tokens.fs.sm,
  lineHeight: 1,
  "&:hover": { background: tokens.bg2, color: tokens.text },
});
