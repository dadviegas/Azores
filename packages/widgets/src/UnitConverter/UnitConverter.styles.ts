import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  justifyContent: "center",
});

export const Tabs = styled.div({
  display: "flex",
  gap: tokens.s[1],
});

export const Tab = styled.button<{ active: boolean }>(({ active }) => ({
  background: active ? tokens.bg3 : "transparent",
  border: `1px solid ${active ? tokens.line2 : tokens.line}`,
  color: active ? tokens.text : tokens.text3,
  borderRadius: tokens.r.md,
  fontSize: 11,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  cursor: "pointer",
  fontFamily: "inherit",
}));

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Side = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const Input = styled.input({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  fontSize: 16,
  fontFamily: "var(--az-font-mono)",
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  textAlign: "right",
  outline: "none",
  width: "100%",
  fontVariantNumeric: "tabular-nums",
  "&:focus-visible": { borderColor: tokens.ocean[500] },
});

export const Select = styled.select({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  fontSize: 11,
  padding: `${tokens.s[1]} ${tokens.s[2]}`,
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer",
});

export const Arrow = styled.span({
  fontSize: 14,
  color: tokens.text3,
});
