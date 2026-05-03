import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: tokens.s[3],
});

export const Hint = styled.div({
  fontSize: 14,
  fontFamily: "var(--az-font-mono)",
  color: tokens.text,
  minHeight: 18,
});

export const Tries = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
});

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Input = styled.input({
  width: 80,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  color: tokens.text,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  textAlign: "center",
});

export const Btn = styled.button<{ primary?: boolean }>(({ primary }) => ({
  background: primary ? "var(--az-primary)" : tokens.bg2,
  color: primary ? "#fff" : tokens.text,
  border: `1px solid ${primary ? "var(--az-primary)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
}));
