import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  height: "100%",
});

export const Bubble = styled.div<{ $scale: number }>(({ $scale }) => ({
  width: 110,
  height: 110,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(90,163,232,0.6), rgba(90,163,232,0.15))",
  border: `1px solid ${tokens.line}`,
  transform: `scale(${$scale})`,
  transition: "transform 1s ease-in-out",
  display: "grid",
  placeItems: "center",
  fontSize: 22,
  fontWeight: 600,
  color: tokens.text,
  fontVariantNumeric: "tabular-nums",
}));

export const Phase = styled.div({
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: tokens.text3,
});
