import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "auto 1fr",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Toolbar = styled.div({
  gridColumn: "1 / span 2",
  display: "flex",
  gap: 6,
});

export const Btn = styled.button<{ $active?: boolean }>(({ $active }) => ({
  background: $active ? "var(--az-primary)" : tokens.bg2,
  color: $active ? "#fff" : tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  cursor: "pointer",
  fontFamily: "inherit",
}));

export const Area = styled.textarea({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  resize: "none",
  outline: "none",
  minHeight: 0,
});
