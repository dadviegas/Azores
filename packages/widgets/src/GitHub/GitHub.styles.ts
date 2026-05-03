import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
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
  "&:last-of-type": { borderBottom: "none" },
});

export const Header = styled.div({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: tokens.s[2],
});

export const Repo = styled.a({
  fontSize: 13,
  fontWeight: 500,
  color: tokens.text,
  textDecoration: "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": { textDecoration: "underline" },
});

export const Stars = styled.span({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
  whiteSpace: "nowrap",
});

export const Description = styled.div({
  fontSize: 11,
  color: tokens.text2,
  marginTop: 2,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const Lang = styled.span({
  fontSize: 10,
  color: tokens.text3,
  marginTop: 2,
  display: "inline-block",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
