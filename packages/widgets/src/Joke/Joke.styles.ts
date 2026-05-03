import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: tokens.s[3],
  height: "100%",
});

export const Setup = styled.div({
  fontSize: 14,
  fontWeight: 500,
  color: tokens.text,
  lineHeight: 1.4,
});

export const Punchline = styled.div({
  fontSize: 14,
  color: tokens.text2,
  lineHeight: 1.4,
  fontStyle: "italic",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
