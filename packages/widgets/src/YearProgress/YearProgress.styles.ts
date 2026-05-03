import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});
export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 36,
  fontWeight: 700,
  color: "var(--az-primary)",
});
export const Bar = styled.div({
  width: "100%",
  height: 8,
  background: tokens.bg3,
  borderRadius: 4,
  overflow: "hidden",
});
export const Fill = styled.div<{ $pct: number }>(({ $pct }) => ({
  height: "100%",
  width: `${$pct}%`,
  background: "var(--az-primary)",
  transition: "width 600ms ease",
}));
export const Sub = styled.div({ fontSize: 11, color: tokens.text3 });
