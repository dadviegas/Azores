import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Backdrop = styled.div<{ $align?: "center" | "top" }>(({ $align = "center" }) => ({
  position: "fixed",
  inset: 0,
  background: "rgba(11, 14, 18, 0.45)",
  display: "flex",
  alignItems: $align === "top" ? "flex-start" : "center",
  justifyContent: "center",
  paddingTop: $align === "top" ? "12vh" : 0,
  zIndex: tokens.z.modal,
  animation: "az-fadein 120ms var(--az-ease-out, ease-out)",
  "@keyframes az-fadein": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

export const Dialog = styled.div<{ $width?: string }>(({ $width = "480px" }) => ({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.lg,
  boxShadow: tokens.shadow.xl,
  width: "min(100%, " + $width + ")",
  maxHeight: "min(90vh, 720px)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  outline: "none",
}));

export const Header = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: tokens.s[3],
  padding: `${tokens.s[4]} ${tokens.s[5]}`,
  borderBottom: `1px solid ${tokens.line}`,
});

export const Title = styled.h3({
  margin: 0,
  fontSize: tokens.fs.lg,
  fontWeight: tokens.fw.semi,
  letterSpacing: "-0.005em",
});

export const Body = styled.div<{ $padded?: boolean }>(({ $padded = true }) => ({
  padding: $padded ? tokens.s[5] : 0,
  overflowY: "auto",
  color: tokens.text2,
}));

export const Footer = styled.div({
  display: "flex",
  gap: tokens.s[2],
  justifyContent: "flex-end",
  padding: `${tokens.s[3]} ${tokens.s[5]}`,
  borderTop: `1px solid ${tokens.line}`,
  background: tokens.bg2,
});
