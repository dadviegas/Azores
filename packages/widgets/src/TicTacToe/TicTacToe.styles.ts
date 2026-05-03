import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[3],
  height: "100%",
});

export const Board = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 44px)",
  gridTemplateRows: "repeat(3, 44px)",
  gap: tokens.s[1],
});

export const Cell = styled.button<{ $win?: boolean }>(({ $win }) => ({
  background: $win ? "var(--az-primary)" : tokens.bg2,
  color: $win ? "#fff" : tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 700,
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
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
