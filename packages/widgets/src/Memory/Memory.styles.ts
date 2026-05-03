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
  gridTemplateColumns: "repeat(4, 38px)",
  gridTemplateRows: "repeat(3, 38px)",
  gap: tokens.s[1],
});

export const Card = styled.button<{ $faceUp: boolean; $matched: boolean }>(
  ({ $faceUp, $matched }) => ({
    background: $matched
      ? "var(--az-primary)"
      : $faceUp
        ? tokens.bg2
        : tokens.surface,
    color: $matched ? "#fff" : tokens.text,
    border: `1px solid ${tokens.line}`,
    borderRadius: tokens.r.md,
    fontSize: 18,
    fontFamily: "var(--az-font-mono)",
    cursor: $matched || $faceUp ? "default" : "pointer",
    display: "grid",
    placeItems: "center",
    opacity: $matched ? 0.7 : 1,
  }),
);

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
