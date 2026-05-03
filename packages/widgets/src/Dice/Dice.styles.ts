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

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Die = styled.div({
  width: 44,
  height: 44,
  display: "grid",
  placeItems: "center",
  borderRadius: tokens.r.md,
  background: tokens.bg2,
  border: `1px solid ${tokens.line2}`,
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 700,
});

export const Total = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
});

export const Controls = styled.div({
  display: "flex",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Btn = styled.button<{ primary?: boolean }>(({ primary }) => ({
  background: primary ? "var(--az-primary)" : tokens.bg2,
  color: primary ? "#fff" : tokens.text,
  border: `1px solid ${primary ? "var(--az-primary)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: "inherit",
}));

export const Count = styled.span({
  fontSize: 11,
  color: tokens.text3,
});
