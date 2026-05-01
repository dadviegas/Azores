import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Shell = styled.div({
  position: "relative",
  minHeight: "100dvh",
  isolation: "isolate",
});

export const Page = styled.div({
  position: "relative",
  zIndex: 1,
  maxWidth: 1180,
  margin: "0 auto",
  padding: `${tokens.s[8]} ${tokens.s[6]}`,
});

export const Header = styled.header({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: tokens.s[8],
});

export const Eyebrow = styled.div({
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: tokens.text3,
});

export const Title = styled.h1({
  fontFamily: "var(--az-font-display)",
  fontSize: 36,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  margin: `${tokens.s[2]} 0 ${tokens.s[2]}`,
});

export const Lede = styled.p({
  color: tokens.text2,
  fontSize: 15,
  lineHeight: 1.6,
  margin: 0,
  maxWidth: 640,
});

export const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: tokens.s[5],
  marginTop: tokens.s[8],
  "@media (max-width: 760px)": {
    gridTemplateColumns: "1fr",
  },
});

export const Tile = styled.section({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.lg,
  padding: tokens.s[5],
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[4],
  minHeight: 220,
  transition: `border-color ${tokens.dur.fast} ${tokens.ease}`,
  "&:hover": { borderColor: tokens.line2 },
});

export const TileHead = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: tokens.s[3],
  borderBottom: `1px solid ${tokens.line}`,
});

export const TileTitle = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[3],
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.02em",
});

export const IconBox = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: tokens.r.sm,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  color: tokens.text2,
});

export const TileBody = styled.div({
  flex: 1,
  minHeight: 0,
});

export const RefreshBtn = styled.button({
  appearance: "none",
  background: "transparent",
  border: `1px solid ${tokens.line}`,
  color: tokens.text3,
  borderRadius: tokens.r.sm,
  width: 26,
  height: 26,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: `color ${tokens.dur.fast} ${tokens.ease}, border-color ${tokens.dur.fast} ${tokens.ease}`,
  "&:hover": { color: tokens.text, borderColor: tokens.line2 },
});
