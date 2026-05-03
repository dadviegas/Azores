import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Form = styled.form({
  display: "grid",
  gridTemplateColumns: "1fr 80px auto",
  gap: 4,
});

export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 8px",
  fontSize: 12,
  outline: "none",
});

export const Btn = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  gap: 8,
  padding: "4px 6px",
  borderBottom: `1px solid ${tokens.line}`,
  fontSize: 12,
  alignItems: "baseline",
});

export const Amount = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontWeight: 600,
  color: tokens.text,
});

export const Total = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: "6px 8px",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  fontWeight: 700,
});

export const X = styled.button({
  background: "transparent",
  border: "none",
  color: tokens.text3,
  cursor: "pointer",
  fontSize: 14,
  padding: 0,
});
