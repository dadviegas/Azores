import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: tokens.s[3],
  height: "100%",
  padding: tokens.s[2],
});

export const Body = styled.blockquote({
  margin: 0,
  fontSize: 15,
  lineHeight: 1.4,
  color: tokens.text,
  fontStyle: "italic",
  position: "relative",
  paddingLeft: tokens.s[3],
  borderLeft: `2px solid ${tokens.line2}`,
});

export const Author = styled.cite({
  fontSize: 12,
  fontStyle: "normal",
  color: tokens.text3,
  alignSelf: "flex-end",
  "&::before": { content: '"— "' },
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
