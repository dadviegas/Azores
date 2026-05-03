import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
  padding: tokens.s[3],
});

export const Word = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  letterSpacing: "0.2em",
  fontWeight: 700,
});

export const Status = styled.div<{ $lost?: boolean; $won?: boolean }>(
  ({ $lost, $won }) => ({
    fontSize: 11,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    fontFamily: "var(--az-font-mono)",
    color: $lost ? "var(--az-danger, #f55)" : $won ? "var(--az-primary)" : tokens.text3,
    minHeight: 16,
  }),
);

export const Keyboard = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(13, 1fr)",
  gap: 3,
  width: "100%",
  maxWidth: 360,
});

export const Key = styled.button<{ $used?: boolean; $hit?: boolean }>(
  ({ $used, $hit }) => ({
    background: $hit ? "var(--az-primary)" : $used ? tokens.surface : tokens.bg2,
    color: $hit ? "#fff" : $used ? tokens.text3 : tokens.text,
    border: `1px solid ${tokens.line}`,
    borderRadius: tokens.r.sm,
    padding: "4px 0",
    fontSize: 11,
    fontFamily: "var(--az-font-mono)",
    fontWeight: 600,
    cursor: $used ? "default" : "pointer",
  }),
);

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
});
