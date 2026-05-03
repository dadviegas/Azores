import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
  justifyContent: "center",
});

export const Repo = styled.a({
  fontSize: 14,
  fontWeight: 600,
  color: tokens.text,
  textDecoration: "none",
  "&:hover": { textDecoration: "underline" },
});

export const Stats = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: tokens.s[3],
});

export const Stat = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

export const Label = styled.span({
  fontSize: 10,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
});

export const Value = styled.span({
  fontFamily: "var(--az-font-mono)",
  fontSize: 18,
  fontWeight: 600,
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
