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

export const Phase = styled.div<{ $work: boolean }>(({ $work }) => ({
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: $work ? "#dc3c3c" : "#3cb45a",
}));

export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 44,
  fontWeight: 700,
  color: tokens.text,
  fontVariantNumeric: "tabular-nums",
});

export const Round = styled.div({
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

export const Cfg = styled.div({
  display: "flex",
  gap: 6,
  fontSize: 11,
  color: tokens.text3,
  alignItems: "center",
});

export const Num = styled.input({
  width: 48,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  color: tokens.text,
  borderRadius: tokens.r.sm,
  padding: "2px 4px",
  fontSize: 11,
  fontFamily: "var(--az-font-mono)",
  outline: "none",
});
