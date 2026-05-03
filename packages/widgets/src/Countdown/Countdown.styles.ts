import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[3],
  height: "100%",
});

export const Units = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: tokens.s[3],
  width: "100%",
});

export const Unit = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
});

export const Number = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 28,
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
});

export const Label = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const Target = styled.div({
  fontSize: 11,
  color: tokens.text3,
});
