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
  objectFit: "cover",
  borderRadius: tokens.r.md,
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

export const Title = styled.div({
  fontSize: 14,
  fontWeight: 600,
  color: tokens.text,
});

export const Extract = styled.div({
  fontSize: 12,
  color: tokens.text2,
  lineHeight: 1.45,
  display: "-webkit-box",
  WebkitLineClamp: 6,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const Link = styled.a({
  fontSize: 11,
  color: tokens.primary,
  textDecoration: "none",
  alignSelf: "flex-start",
  marginTop: "auto",
  "&:hover": { textDecoration: "underline" },
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
