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
export const Big = styled.div({ fontFamily: "var(--az-font-mono)", fontSize: 22, fontWeight: 700, color: "var(--az-primary)" });
export const List = styled.div({ display: "flex", flexDirection: "column", gap: 2, marginTop: "auto" });
export const Sm = styled.div({ display: "grid", gridTemplateColumns: "1fr auto", fontSize: 11, color: tokens.text3, fontFamily: "var(--az-font-mono)" });
export const Val = styled.span({ color: tokens.text, fontWeight: 600 });
