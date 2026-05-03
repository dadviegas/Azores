import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  justifyContent: "center",
});

export const Ip = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: "0.02em",
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  columnGap: tokens.s[3],
  rowGap: tokens.s[1],
  fontSize: 12,
});

export const Label = styled.span({
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontSize: 10,
  alignSelf: "center",
});

export const Value = styled.span({
  color: tokens.text,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
