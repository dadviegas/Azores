import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({ display: "flex", flexDirection: "column", gap: 6, height: "100%", minHeight: 0 });
export const Row = styled.label({ display: "grid", gridTemplateColumns: "100px 1fr", gap: 8, alignItems: "center", fontSize: 12, color: tokens.text2 });
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
export const Chart = styled.div({
  flex: 1,
  display: "flex",
  alignItems: "flex-end",
  gap: 2,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: 6,
  minHeight: 60,
});
export const Bar = styled.div<{ $h: number }>(({ $h }) => ({
  flex: 1,
  height: `${$h}%`,
  background: "linear-gradient(180deg, var(--az-primary), rgba(90,163,232,0.4))",
  borderRadius: 2,
}));
export const Big = styled.div({ fontFamily: "var(--az-font-mono)", fontSize: 18, fontWeight: 700, color: "var(--az-primary)" });
export const Sub = styled.div({ fontSize: 11, color: tokens.text3 });
