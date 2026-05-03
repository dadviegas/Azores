import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  height: "100%",
  justifyContent: "center",
});
export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 700,
  color: "var(--az-primary)",
  textAlign: "center",
});
export const Bar = styled.div({ width: "100%", height: 8, background: tokens.bg3, borderRadius: 4, overflow: "hidden" });
export const Fill = styled.div<{ $pct: number; $color?: string }>(({ $pct, $color }) => ({
  height: "100%",
  width: `${$pct}%`,
  background: $color ?? "var(--az-primary)",
  transition: "width 600ms ease",
}));
export const Lbl = styled.div({ fontSize: 10, color: tokens.text3, textTransform: "uppercase", letterSpacing: "0.06em" });
