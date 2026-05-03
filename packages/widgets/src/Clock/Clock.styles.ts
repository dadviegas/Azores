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

export const Time = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 36,
  fontWeight: 600,
  letterSpacing: "0.04em",
  fontVariantNumeric: "tabular-nums",
});

export const Date = styled.div({
  fontSize: 12,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});
