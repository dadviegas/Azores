import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  height: "100%",
  minHeight: 0,
});
export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 8,
  alignItems: "center",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontSize: 12,
});
export const Time = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontWeight: 700,
  color: tokens.text,
});
export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  outline: "none",
});
