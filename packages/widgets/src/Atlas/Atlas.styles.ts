import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
});

export const Hero = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
});

export const Flag = styled.div({
  fontSize: 40,
  lineHeight: 1,
  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))",
});

export const NameBlock = styled.div({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
});

export const CountryName = styled.div({
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const CountryMeta = styled.div({
  fontSize: 11,
  color: tokens.text3,
});

export const Stats = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: tokens.s[2],
  marginTop: "auto",
});

export const Stat = styled.div({
  background: tokens.bg2,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const StatLabel = styled.span({
  fontSize: 10,
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const StatValue = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  fontWeight: 600,
});
