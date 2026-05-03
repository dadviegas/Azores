import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Search = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontSize: 12,
  outline: "none",
});

export const List = styled.div({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  minHeight: 0,
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "48px 1fr",
  gap: tokens.s[2],
  padding: "6px 4px",
  borderBottom: `1px solid ${tokens.line}`,
  alignItems: "baseline",
});

export const Code = styled.span<{ $tone: string }>(({ $tone }) => ({
  fontFamily: "var(--az-font-mono)",
  fontWeight: 700,
  fontSize: 12,
  color: $tone,
}));

export const Title = styled.span({
  fontSize: 12,
  color: tokens.text,
});

export const Desc = styled.div({
  fontSize: 11,
  color: tokens.text3,
});
