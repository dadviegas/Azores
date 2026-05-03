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

export const Btn = styled.button<{ $active?: boolean }>(({ $active }) => ({
  background: $active ? "var(--az-primary)" : tokens.bg2,
  color: $active ? "#fff" : tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
}));

export const TextArea = styled.textarea({
  flex: 1,
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
