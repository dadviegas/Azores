import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "8px 10px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "90px 1fr",
  gap: 8,
  padding: "4px 6px",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
});

export const Tag = styled.span({
  fontWeight: 700,
  color: tokens.text3,
  textTransform: "uppercase",
  fontSize: 10,
});

export const Val = styled.span({
  color: tokens.text,
  wordBreak: "break-all",
});

export const Err = styled.div({
  fontSize: 11,
  color: "var(--az-danger,#d33)",
});
