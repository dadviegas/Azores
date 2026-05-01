import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  fontSize: 11,
  color: tokens.text3,
  gap: tokens.s[2],
});

export const FeedTitle = styled.span({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const List = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  overflowY: "auto",
  flex: 1,
  minHeight: 0,
});

export const Item = styled.li({
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const ItemLink = styled.a({
  fontSize: 12,
  fontWeight: 600,
  color: tokens.text,
  textDecoration: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  "&:hover": { color: tokens.primary, textDecoration: "underline" },
});

export const Meta = styled.span({
  fontSize: 10,
  color: tokens.text3,
  fontVariantNumeric: "tabular-nums",
});
