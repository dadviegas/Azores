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
  gap: 6,
  alignItems: "center",
  fontSize: 12,
  color: tokens.text2,
});

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "4px 10px",
  fontSize: 12,
  cursor: "pointer",
  fontFamily: "inherit",
});

export const Range = styled.input({ flex: 1 });

export const Out = styled.div({
  flex: 1,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontSize: 12,
  lineHeight: 1.5,
  overflow: "auto",
  minHeight: 0,
});
