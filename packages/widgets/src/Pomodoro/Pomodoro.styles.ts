import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[3],
  height: "100%",
});

export const Mode = styled.div<{ work: boolean }>(({ work }) => ({
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: work ? "var(--az-coral-500)" : "var(--az-ocean-500)",
  fontWeight: 600,
}));

export const Time = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 40,
  fontWeight: 700,
  letterSpacing: "0.04em",
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1,
});

export const Buttons = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Btn = styled.button({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  color: tokens.text,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  "&:hover": { background: tokens.bg3 },
  "&:focus-visible": { outline: `2px solid ${tokens.ocean[500]}`, outlineOffset: 2 },
});
