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
  fontSize: 13,
  outline: "none",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.button({
  display: "grid",
  gridTemplateColumns: "100px 1fr",
  gap: 8,
  alignItems: "center",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  cursor: "pointer",
  textAlign: "left",
  color: tokens.text,
  fontFamily: "inherit",
  "&:hover": { background: tokens.bg3 },
});

export const Tag = styled.span({
  fontSize: 10,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const Val = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
