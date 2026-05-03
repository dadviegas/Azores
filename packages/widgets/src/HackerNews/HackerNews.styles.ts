import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
});

export const List = styled.ol({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  overflowY: "auto",
});

export const Item = styled.li({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  paddingBottom: tokens.s[2],
  borderBottom: `1px solid ${tokens.line}`,
  "&:last-of-type": { borderBottom: "none" },
});

export const Title = styled.a({
  fontSize: 13,
  fontWeight: 500,
  color: tokens.text,
  textDecoration: "none",
  lineHeight: 1.35,
  "&:hover": { textDecoration: "underline" },
});

export const Meta = styled.span({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
