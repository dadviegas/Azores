import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  height: "100%",
  overflow: "hidden",
});

export const Banner = styled.div<{ band: string }>(({ band }) => ({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: `${band}22`,
  border: `1px solid ${band}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  fontSize: 13,
  fontWeight: 500,
}));

export const Dot = styled.span<{ band: string }>(({ band }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: band,
  flexShrink: 0,
}));

export const List = styled.ul({
  margin: 0,
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[1],
  overflowY: "auto",
});

export const Row = styled.li({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  fontSize: 12,
});

export const Name = styled.span({
  flex: 1,
  color: tokens.text2,
});

export const State = styled.span({
  fontSize: 10,
  color: tokens.text3,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  fontFamily: "var(--az-font-mono)",
});

export const Empty = styled.div({
  fontSize: 12,
  color: tokens.text3,
});
