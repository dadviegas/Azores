import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: tokens.s[2],
  height: "100%",
  padding: tokens.s[3],
  overflow: "auto",
});

export const Rows = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  width: "100%",
});

export const Row = styled.div({
  display: "flex",
  gap: tokens.s[2],
  alignItems: "center",
  justifyContent: "center",
});

export const Pegs = styled.div({
  display: "flex",
  gap: 3,
});

export const Peg = styled.div<{ $color: string }>(({ $color }) => ({
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: $color,
  border: `1px solid ${tokens.line}`,
}));

export const Feedback = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 8px)",
  gridTemplateRows: "repeat(2, 8px)",
  gap: 2,
  width: 18,
});

export const Hint = styled.div<{ $color: string }>(({ $color }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: $color,
}));

export const Picker = styled.div({
  display: "flex",
  gap: tokens.s[1],
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
});

export const PickPeg = styled.button<{ $color: string; $selected?: boolean }>(
  ({ $color, $selected }) => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: $color,
    border: $selected
      ? `2px solid var(--az-primary)`
      : `1px solid ${tokens.line}`,
    cursor: "pointer",
  }),
);

export const Slot = styled.button<{ $color?: string }>(({ $color }) => ({
  width: 22,
  height: 22,
  borderRadius: "50%",
  background: $color ?? tokens.surface,
  border: `1px dashed ${tokens.line}`,
  cursor: "pointer",
}));

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
