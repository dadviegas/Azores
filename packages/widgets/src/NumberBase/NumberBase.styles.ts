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
  display: "grid",
  gridTemplateColumns: "60px 1fr",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Label = styled.label({
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  color: tokens.text3,
});

export const Input = styled.input<{ $error?: boolean }>(({ $error }) => ({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${$error ? "var(--az-danger,#d33)" : tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
}));
