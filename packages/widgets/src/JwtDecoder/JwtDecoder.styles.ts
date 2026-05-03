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
  fontSize: 11,
  resize: "none",
  outline: "none",
  minHeight: 60,
});

export const Pane = styled.div({
  flex: 1,
  display: "grid",
  gridTemplateRows: "1fr 1fr",
  gap: tokens.s[2],
  minHeight: 0,
});

export const Pre = styled.pre({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  margin: 0,
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
});

export const Label = styled.div({
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: tokens.text3,
  marginBottom: 2,
});

export const Err = styled.div({
  fontSize: 11,
  color: "var(--az-danger,#d33)",
});
