import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 36,
  fontWeight: 700,
  color: "var(--az-primary)",
});

export const Sub = styled.div({
  fontSize: 11,
  color: tokens.text3,
});

export const Row = styled.div({
  display: "flex",
  gap: 6,
});

export const Btn = styled.button({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  color: tokens.text,
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const Bars = styled.div({
  display: "flex",
  gap: 2,
  alignItems: "flex-end",
  height: 32,
  marginTop: 8,
});

export const Bar = styled.div<{ $h: number }>(({ $h }) => ({
  width: 12,
  height: `${Math.max(2, $h)}%`,
  background: "var(--az-primary)",
  borderRadius: 2,
  opacity: 0.6,
}));
