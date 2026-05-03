import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
  outline: "none",
});

export const Board = styled.div<{ $cols: number; $rows: number }>(({ $cols, $rows }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${$cols}, 16px)`,
  gridTemplateRows: `repeat(${$rows}, 16px)`,
  gap: 1,
  background: tokens.line,
  padding: 1,
  borderRadius: tokens.r.md,
}));

export const Cell = styled.div<{ $kind: "empty" | "snake" | "head" | "food" }>(
  ({ $kind }) => ({
    background:
      $kind === "head"
        ? "var(--az-primary)"
        : $kind === "snake"
          ? "var(--az-primary)"
          : $kind === "food"
            ? "#ef4444"
            : tokens.bg,
    opacity: $kind === "snake" ? 0.7 : 1,
    borderRadius: 2,
  }),
);

export const Status = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
});

export const Btn = styled.button<{ primary?: boolean }>(({ primary }) => ({
  background: primary ? "var(--az-primary)" : tokens.bg2,
  color: primary ? "#fff" : tokens.text,
  border: `1px solid ${primary ? "var(--az-primary)" : tokens.line}`,
  borderRadius: tokens.r.md,
  padding: `${tokens.s[1]} ${tokens.s[3]}`,
  fontSize: 12,
  cursor: "pointer",
}));
