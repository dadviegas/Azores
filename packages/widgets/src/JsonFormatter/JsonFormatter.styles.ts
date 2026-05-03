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
  flexWrap: "wrap",
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
  "&:hover": { background: tokens.bg3 },
  "&:focus-visible": { outline: `2px solid ${tokens.ocean[500]}`, outlineOffset: 1 },
});

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
  "&:focus-visible": { borderColor: tokens.ocean[500] },
});

export const Status = styled.div<{ $error?: boolean }>(({ $error }) => ({
  fontSize: 11,
  color: $error ? "var(--az-danger, #d33)" : tokens.text3,
  fontFamily: "var(--az-font-mono)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
