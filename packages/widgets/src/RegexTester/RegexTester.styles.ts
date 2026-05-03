import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Input = styled.input({
  flex: 1,
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
});

export const Flags = styled.input({
  width: 64,
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
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
  minHeight: 80,
});

export const Matches = styled.div({
  flex: 1,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  overflow: "auto",
  minHeight: 0,
});

export const Status = styled.div<{ $error?: boolean }>(({ $error }) => ({
  fontSize: 11,
  color: $error ? "var(--az-danger,#d33)" : tokens.text3,
}));
