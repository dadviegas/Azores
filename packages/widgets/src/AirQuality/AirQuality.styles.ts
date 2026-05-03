import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
  justifyContent: "center",
});

export const Big = styled.div({
  display: "flex",
  alignItems: "baseline",
  gap: tokens.s[3],
});

export const Aqi = styled.div<{ band: string }>(({ band }) => ({
  fontFamily: "var(--az-font-mono)",
  fontSize: 36,
  fontWeight: 700,
  lineHeight: 1,
  color: band,
}));

export const Band = styled.div<{ band: string }>(({ band }) => ({
  fontSize: 13,
  fontWeight: 500,
  color: band,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
}));

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
  fontSize: 13,
  fontWeight: 500,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
