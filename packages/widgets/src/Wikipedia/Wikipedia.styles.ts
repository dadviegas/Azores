import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  gap: tokens.s[3],
  height: "100%",
  minHeight: 0,
});

export const Thumb = styled.img({
  width: 84,
  height: 84,
  objectFit: "cover",
  borderRadius: tokens.r.md,
  border: `1px solid ${tokens.line}`,
  flexShrink: 0,
});

export const ThumbPlaceholder = styled.div({
  width: 84,
  height: 84,
  borderRadius: tokens.r.md,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  flexShrink: 0,
});

export const Body = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
  flex: 1,
});

export const Title = styled.div({
  fontWeight: 600,
  fontSize: 14,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const Description = styled.div({
  fontSize: 11,
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const Extract = styled.p({
  fontSize: 12,
  lineHeight: 1.5,
  color: tokens.text2,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const Link = styled.a({
  fontSize: 11,
  color: tokens.primary,
  textDecoration: "none",
  marginTop: "auto",
  alignSelf: "flex-start",
  "&:hover": { textDecoration: "underline" },
});
