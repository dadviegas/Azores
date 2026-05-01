import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
});

export const Now = styled.div({
  display: "flex",
  alignItems: "baseline",
  gap: tokens.s[3],
});

export const Temp = styled.div({
  fontFamily: "var(--az-font-display)",
  fontSize: 32,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1,
});

export const Meta = styled.div({
  fontSize: 12,
  color: tokens.text3,
});

export const Forecast = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: tokens.s[2],
  marginTop: "auto",
});

export const Day = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  padding: tokens.s[2],
  background: tokens.bg2,
  borderRadius: tokens.r.md,
  fontSize: 11,
});

export const DayLabel = styled.span({
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const DayHigh = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontWeight: 600,
});
