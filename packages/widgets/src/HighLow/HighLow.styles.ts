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

export const Card = styled.div({
  width: 60,
  height: 84,
  display: "grid",
  placeItems: "center",
  borderRadius: tokens.r.md,
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  fontFamily: "var(--az-font-mono)",
  fontSize: 24,
  fontWeight: 700,
});

export const Verdict = styled.div<{ $tone?: "ok" | "bad" }>(({ $tone }) => ({
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
  color:
    $tone === "ok"
      ? "var(--az-primary)"
      : $tone === "bad"
        ? "var(--az-danger, #f55)"
        : tokens.text3,
  minHeight: 16,
}));

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
});

export const Btn = styled.button({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
});

export const Score = styled.div({
  fontSize: 11,
  color: tokens.text3,
  fontFamily: "var(--az-font-mono)",
});
