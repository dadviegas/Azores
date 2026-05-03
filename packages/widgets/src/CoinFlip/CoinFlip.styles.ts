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

export const Coin = styled.div<{ flipping: boolean }>(({ flipping }) => ({
  width: 56,
  height: 56,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(135deg, var(--az-honey-300, #f1d175), var(--az-honey-500, #e9c46a))",
  border: "1px solid var(--az-honey-700, #b6912b)",
  fontFamily: "var(--az-font-mono)",
  fontSize: 13,
  fontWeight: 700,
  color: "var(--az-text)",
  letterSpacing: "0.06em",
  transform: flipping ? "rotateY(540deg)" : "rotateY(0deg)",
  transition: "transform 600ms cubic-bezier(0.4, 0.1, 0.2, 1)",
}));

export const Tally = styled.div({
  display: "flex",
  gap: tokens.s[3],
  fontSize: 11,
  fontFamily: "var(--az-font-mono)",
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Btn = styled.button({
  background: "var(--az-primary)",
  color: "#fff",
  border: "none",
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[4]}`,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
});
