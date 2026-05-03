import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  height: "100%",
  borderRadius: tokens.r.md,
  overflow: "hidden",
  border: `1px solid ${tokens.line}`,
  background: tokens.bg2,
});

export const Img = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
  padding: tokens.s[3],
});
