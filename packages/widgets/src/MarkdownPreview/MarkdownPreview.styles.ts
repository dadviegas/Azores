import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
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
  minHeight: 0,
});

export const Preview = styled.div({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontSize: 13,
  lineHeight: 1.5,
  color: tokens.text,
  overflow: "auto",
  minHeight: 0,
  "& h1, & h2, & h3": { margin: "8px 0 4px" },
  "& h1": { fontSize: 18 },
  "& h2": { fontSize: 16 },
  "& h3": { fontSize: 14 },
  "& p": { margin: "4px 0" },
  "& code": {
    background: tokens.bg3,
    padding: "1px 4px",
    borderRadius: 4,
    fontFamily: "var(--az-font-mono)",
    fontSize: 12,
  },
  "& pre": {
    background: tokens.bg3,
    padding: 8,
    borderRadius: 6,
    overflow: "auto",
    fontFamily: "var(--az-font-mono)",
    fontSize: 12,
  },
  "& ul, & ol": { paddingLeft: 18, margin: "4px 0" },
  "& blockquote": {
    margin: "4px 0",
    borderLeft: `3px solid ${tokens.line2}`,
    paddingLeft: 8,
    color: tokens.text3,
  },
  "& a": { color: "var(--az-primary)" },
});
