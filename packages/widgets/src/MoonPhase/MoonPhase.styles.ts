import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[4],
  height: "100%",
});

export const Disk = styled.div({
  position: "relative",
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "var(--az-bg-3)",
  overflow: "hidden",
  boxShadow: "inset 0 0 0 1px var(--az-line)",
  flexShrink: 0,
});

export const Lit = styled.div<{ left: number; right: number }>(({ left, right }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: `${left}%`,
  right: `${right}%`,
  background: "var(--az-text)",
}));

export const Body = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export const Phase = styled.div({
  fontSize: 14,
  fontWeight: 600,
});

export const Meta = styled.div({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});
