import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  fontSize: 11,
  color: tokens.text3,
  gap: tokens.s[3],
});

export const Title = styled.span({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const Latest = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
});

export const LatestValue = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 600,
});

export const LatestMeta = styled.span({
  fontSize: 11,
  color: tokens.text3,
});

export const Series = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
  gap: tokens.s[2],
  flex: 1,
  alignContent: "center",
});

export const Cell = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.sm,
});

export const Year = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
});

export const Value = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  fontWeight: 500,
});
