import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Area = styled.textarea({
  flex: 1,
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "inherit",
  fontSize: 12,
  resize: "none",
  outline: "none",
  minHeight: 0,
});

export const List = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});
export const Val = styled.span({ color: tokens.text, fontWeight: 600 });
