import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Area = styled.textarea({
  flex: 1,
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontFamily: "inherit",
  fontSize: 12,
  resize: "none",
  outline: "none",
  minHeight: 0,
});

export const Stats = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 4,
});

export const Box = styled.div({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  textAlign: "center",
});

export const Num = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 16,
  fontWeight: 700,
  color: tokens.text,
});

export const Label = styled.div({
  fontSize: 10,
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});
