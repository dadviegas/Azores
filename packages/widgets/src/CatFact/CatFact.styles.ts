import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
});

export const Fact = styled.p({
  margin: 0,
  fontSize: 14,
  lineHeight: 1.45,
  color: tokens.text,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
