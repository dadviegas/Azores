import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
});

export const Hand = styled.div({
  fontSize: 32,
  fontFamily: "var(--az-font-mono)",
});

export const Result = styled.div({
  fontSize: 12,
  color: tokens.text2,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
  minHeight: 18,
});

export const Score = styled.div({
  display: "flex",
  gap: tokens.s[3],
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 14,
  cursor: "pointer",
});
