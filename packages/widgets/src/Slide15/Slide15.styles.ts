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
  gridTemplateColumns: "repeat(4, 36px)",
  gridTemplateRows: "repeat(4, 36px)",
  gap: 3,
});

export const Tile = styled.button<{ $gap?: boolean }>(({ $gap }) => ({
  background: $gap ? "transparent" : tokens.bg2,
  color: tokens.text,
  border: $gap ? `1px dashed ${tokens.line}` : `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  fontWeight: 600,
  cursor: $gap ? "default" : "pointer",
}));

export const Status = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
});

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
});
