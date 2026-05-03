import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({ display: "flex", flexDirection: "column", gap: 6, height: "100%" });
export const Big = styled.button({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: 8,
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 700,
  color: "var(--az-primary)",
  textAlign: "center",
  cursor: "pointer",
  fontVariantNumeric: "tabular-nums",
});
export const Row = styled.label({ display: "grid", gridTemplateColumns: "60px 1fr", gap: 8, alignItems: "center", fontSize: 12, color: tokens.text2 });
export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
});
