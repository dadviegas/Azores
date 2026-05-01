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
  fontSize: 11,
  color: tokens.text3,
});

export const Rates = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: tokens.s[2],
  flex: 1,
  alignContent: "center",
});

export const Pair = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
});

export const Code = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
});

export const Rate = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 14,
  fontWeight: 600,
});
