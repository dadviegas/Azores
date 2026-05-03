import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({ display: "flex", flexDirection: "column", gap: 6, height: "100%" });
export const Row = styled.label({ display: "grid", gridTemplateColumns: "60px 1fr", gap: 8, alignItems: "center", fontSize: 12, color: tokens.text2 });
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
export const Out = styled.div({
  marginTop: "auto",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: 10,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
});
export const Big = styled.div({ fontFamily: "var(--az-font-mono)", fontSize: 18, fontWeight: 700, color: "var(--az-primary)" });
export const Lbl = styled.div({ fontSize: 10, color: tokens.text3, textTransform: "uppercase", letterSpacing: "0.06em" });
