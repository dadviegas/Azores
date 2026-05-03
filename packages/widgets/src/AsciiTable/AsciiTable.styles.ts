import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Search = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontSize: 12,
  outline: "none",
});

export const Grid = styled.div({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
  gap: 4,
  overflow: "auto",
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  minHeight: 0,
});

export const Cell = styled.button({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 6px",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 6,
  alignItems: "center",
  textAlign: "left",
  cursor: "pointer",
  color: tokens.text,
  fontFamily: "inherit",
  "&:hover": { background: tokens.bg3 },
});

export const Char = styled.span({
  fontWeight: 700,
  color: "var(--az-primary)",
});

export const Codes = styled.span({
  color: tokens.text3,
  fontSize: 10,
});
