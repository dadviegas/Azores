import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export type DrawerSide = "left" | "right";

export const DrawerBackdrop = styled.div({
  position: "fixed",
  inset: 0,
  background: "rgba(11, 14, 18, 0.35)",
  zIndex: tokens.z.modal,
  animation: "az-fadein 120ms var(--az-ease-out, ease-out)",
  "@keyframes az-fadein": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export const DrawerPanel = styled.aside<{ $side: DrawerSide; $width: string }>(
  ({ $side, $width }) => ({
    position: "fixed",
    top: 0,
    bottom: 0,
    [$side]: 0,
    width: $width,
    maxWidth: "100vw",
    background: tokens.surface,
    borderLeft: $side === "right" ? `1px solid ${tokens.line}` : undefined,
    borderRight: $side === "left" ? `1px solid ${tokens.line}` : undefined,
    boxShadow: tokens.shadow.xl,
    zIndex: tokens.z.modal,
    display: "flex",
    flexDirection: "column",
    outline: "none",
    animation: `az-drawer-${$side} 200ms var(--az-ease-out, ease-out)`,
    [`@keyframes az-drawer-${$side}`]: {
      from: { transform: $side === "right" ? "translateX(100%)" : "translateX(-100%)" },
      to: { transform: "translateX(0)" },
    },
  }),
);

export const DrawerHeader = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: tokens.s[3],
  padding: `${tokens.s[4]} ${tokens.s[5]}`,
  borderBottom: `1px solid ${tokens.line}`,
});

export const DrawerTitle = styled.h3({
  margin: 0,
  fontSize: tokens.fs.lg,
  fontWeight: tokens.fw.semi,
});

export const DrawerBody = styled.div({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  padding: tokens.s[5],
  color: tokens.text2,
});
