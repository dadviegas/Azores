import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const TextArea = styled.textarea({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  resize: "none",
  outline: "none",
  minHeight: 60,
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Tag = styled.div({
  fontSize: 10,
  fontWeight: 600,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
  width: 56,
});

export const Hash = styled.code({
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 6px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
