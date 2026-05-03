import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: tokens.s[3],
  height: "100%",
  alignContent: "center",
});

export const City = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
});

export const Name = styled.div({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const Time = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: "0.02em",
  fontVariantNumeric: "tabular-nums",
});
