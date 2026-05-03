import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
});

export const Month = styled.div({
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.02em",
});

export const Year = styled.div({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 4,
  flex: 1,
});

export const Dow = styled.div({
  fontSize: 9,
  textAlign: "center",
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Day = styled.div<{ today: boolean; muted: boolean }>(
  ({ today, muted }) => ({
    fontSize: 11,
    fontFamily: "var(--az-font-mono)",
    fontVariantNumeric: "tabular-nums",
    display: "grid",
    placeItems: "center",
    borderRadius: 6,
    color: today ? "#fff" : muted ? tokens.text3 : tokens.text,
    background: today ? "var(--az-primary)" : "transparent",
    fontWeight: today ? 700 : 400,
    minHeight: 22,
  }),
);
