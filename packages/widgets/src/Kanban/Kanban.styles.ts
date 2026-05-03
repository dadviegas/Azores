import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Col = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: 8,
  minHeight: 0,
});

export const Head = styled.div({
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: tokens.text3,
  paddingBottom: 4,
  display: "flex",
  justifyContent: "space-between",
});

export const Items = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  overflow: "auto",
  minHeight: 0,
});

export const Card = styled.div({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontSize: 12,
  color: tokens.text,
  cursor: "grab",
  display: "flex",
  gap: 4,
  alignItems: "center",
});

export const Add = styled.input({
  background: tokens.surface,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 6px",
  fontSize: 11,
  outline: "none",
});

export const X = styled.button({
  background: "transparent",
  border: "none",
  color: tokens.text3,
  cursor: "pointer",
  fontSize: 14,
  lineHeight: 1,
  padding: 0,
  marginLeft: "auto",
});
