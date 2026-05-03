import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
  padding: tokens.s[2],
});

export const Text = styled.p({
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  textAlign: "center",
  lineHeight: 1.4,
  color: tokens.text,
});

export const Tag = styled.span({
  fontSize: 10,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: tokens.text3,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
