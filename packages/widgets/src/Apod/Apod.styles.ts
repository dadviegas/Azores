import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  overflow: "hidden",
});

export const ImgFrame = styled.div({
  flex: "1 1 auto",
  minHeight: 80,
  borderRadius: tokens.r.md,
  border: `1px solid ${tokens.line}`,
  overflow: "hidden",
  background: tokens.bg2,
});

export const Img = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const Title = styled.div({
  fontSize: 13,
  fontWeight: 600,
});

export const Caption = styled.div({
  fontSize: 11,
  color: tokens.text3,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
