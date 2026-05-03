import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
  justifyContent: "center",
});

export const Tiers = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: tokens.s[2],
});

export const Tier = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${tokens.s[2]} ${tokens.s[2]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
  alignItems: "center",
});

export const Label = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Value = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 16,
  fontWeight: 600,
});

export const Unit = styled.div({
  fontSize: 10,
  color: tokens.text3,
  textAlign: "center",
  fontFamily: "var(--az-font-mono)",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
