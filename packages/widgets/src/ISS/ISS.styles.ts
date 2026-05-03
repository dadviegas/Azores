import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
  justifyContent: "center",
});

export const Coords = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "0.02em",
});

export const Stats = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: tokens.s[3],
});

export const Stat = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const Label = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Value = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  fontWeight: 500,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
