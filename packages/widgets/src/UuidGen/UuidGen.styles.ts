import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Toolbar = styled.div({
  display: "flex",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
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
  textAlign: "left",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  color: tokens.text,
  cursor: "pointer",
  "&:hover": { background: tokens.bg3 },
});
