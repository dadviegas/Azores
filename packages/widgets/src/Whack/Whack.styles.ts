import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
});

export const Board = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 40px)",
  gridTemplateRows: "repeat(3, 40px)",
  gap: tokens.s[1],
});

export const Hole = styled.button<{ $up: boolean }>(({ $up }) => ({
  background: $up ? "var(--az-primary)" : tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: "50%",
  cursor: $up ? "pointer" : "default",
  transition: "background 80ms",
}));

export const Status = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
});

export const Btn = styled.button<{ primary?: boolean }>(({ primary }) => ({
  background: primary ? "var(--az-primary)" : tokens.bg2,
  color: primary ? "#fff" : tokens.text,
  border: `1px solid ${primary ? "var(--az-primary)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
}));
