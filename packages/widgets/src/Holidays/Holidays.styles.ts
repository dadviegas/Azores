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
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "baseline",
  gap: tokens.s[3],
  paddingBottom: tokens.s[2],
  borderBottom: `1px solid ${tokens.line}`,
  "&:last-of-type": { borderBottom: "none" },
});

export const Date = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  fontWeight: 600,
  color: tokens.text2,
  whiteSpace: "nowrap",
});

export const Name = styled.span({
  fontSize: 13,
  color: tokens.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Days = styled.span({
  fontSize: 11,
  color: tokens.text3,
  whiteSpace: "nowrap",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
