import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const TopRow = styled.div({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Swatch = styled.input({
  width: 56,
  height: 56,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  cursor: "pointer",
  background: "transparent",
  padding: 0,
});

export const Field = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
});

export const Row = styled.div({
  display: "grid",
  gridTemplateColumns: "60px 1fr",
  gap: tokens.s[2],
  alignItems: "center",
});

export const Label = styled.div({
  fontFamily: "var(--az-font-mono)",
  fontSize: 11,
  color: tokens.text3,
});

export const ContrastBox = styled.div<{ $bg: string; $fg: string }>(({ $bg, $fg }) => ({
  background: $bg,
  color: $fg,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[2],
  fontSize: 13,
  textAlign: "center",
  fontWeight: 600,
}));

export const Pill = styled.span<{ $tone: "good" | "ok" | "bad" }>(({ $tone }) => ({
  display: "inline-block",
  padding: "2px 6px",
  borderRadius: 999,
  fontSize: 10,
  fontWeight: 600,
  marginLeft: 6,
  background:
    $tone === "good"
      ? "rgba(60,180,90,0.15)"
      : $tone === "ok"
        ? "rgba(220,170,40,0.15)"
        : "rgba(220,60,60,0.15)",
  color: $tone === "good" ? "#3cb45a" : $tone === "ok" ? "#d8a528" : "#dc3c3c",
}));
