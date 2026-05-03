import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 6,
  height: "100%",
});
export const Box = styled.div({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 28,
  fontWeight: 700,
  color: tokens.text,
});
export const Lbl = styled.div({
  fontSize: 10,
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});
