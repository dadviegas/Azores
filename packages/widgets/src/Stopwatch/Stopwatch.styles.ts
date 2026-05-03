import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: tokens.s[2],
  height: "100%",
  justifyContent: "center",
});

export const Time = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 36,
  fontWeight: 700,
  letterSpacing: "0.02em",
  fontVariantNumeric: "tabular-nums",
});

export const Buttons = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Btn = styled.button<{ primary?: boolean }>(({ primary }) => ({
  background: primary ? "var(--az-primary)" : tokens.bg2,
  color: primary ? "#fff" : tokens.text,
  border: `1px solid ${primary ? "var(--az-primary)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
}));

export const Laps = styled.ol({
  margin: 0,
  padding: 0,
  listStyle: "none",
  width: "100%",
  maxHeight: 80,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const Lap = styled.li({
  display: "flex",
  justifyContent: "space-between",
  fontSize: 11,
  fontFamily: "var(--az-font-mono)",
  color: tokens.text2,
  paddingTop: 2,
  borderTop: `1px solid ${tokens.line}`,
});
