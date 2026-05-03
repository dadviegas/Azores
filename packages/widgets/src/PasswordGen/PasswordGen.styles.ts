import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
});

export const Out = styled.button({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  color: tokens.text,
  cursor: "pointer",
  textAlign: "left",
  wordBreak: "break-all",
  "&:hover": { background: tokens.bg3 },
});

export const Row = styled.label({
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  color: tokens.text2,
});

export const Range = styled.input({ flex: 1 });

export const Btn = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.sm,
  padding: "6px 10px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
});
