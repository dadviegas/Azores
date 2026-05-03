import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
});

export const Today = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const List = styled.ul({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  overflowY: "auto",
});

export const Item = styled.li({
  paddingBottom: tokens.s[2],
  borderBottom: `1px solid ${tokens.line}`,
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: tokens.s[3],
  alignItems: "baseline",
  "&:last-of-type": { borderBottom: "none" },
});

export const Year = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  fontWeight: 600,
  color: tokens.text2,
  whiteSpace: "nowrap",
});

export const Text = styled.span({
  fontSize: 12,
  color: tokens.text,
  lineHeight: 1.4,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
