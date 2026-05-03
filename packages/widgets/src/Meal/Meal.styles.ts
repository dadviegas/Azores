import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  gap: tokens.s[3],
  height: "100%",
  overflow: "hidden",
});

export const Thumb = styled.img({
  width: 96,
  height: 96,
  borderRadius: tokens.r.md,
  objectFit: "cover",
  border: `1px solid ${tokens.line}`,
  flexShrink: 0,
});

export const Body = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[1],
  minWidth: 0,
});

export const Name = styled.div({
  fontSize: 14,
  fontWeight: 600,
});

export const Meta = styled.div({
  fontSize: 11,
  color: tokens.text3,
});

export const Instructions = styled.div({
  fontSize: 11,
  color: tokens.text2,
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
