import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
});

export const Big = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 30,
  fontWeight: 700,
  letterSpacing: "0.02em",
});

export const Pkg = styled.div({
  fontSize: 13,
  fontWeight: 500,
  color: tokens.text2,
});

export const Period = styled.div({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
