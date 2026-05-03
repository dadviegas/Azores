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

export const Kp = styled.div<{ band: string }>(({ band }) => ({
  fontFamily: "var(--az-font-mono)",
  fontSize: 44,
  fontWeight: 700,
  lineHeight: 1,
  color: band,
}));

export const Band = styled.div<{ band: string }>(({ band }) => ({
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: band,
}));

export const When = styled.div({
  fontSize: 10,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
