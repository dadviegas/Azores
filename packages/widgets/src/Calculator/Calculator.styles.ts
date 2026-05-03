import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
});

export const Display = styled.div({
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  padding: tokens.s[3],
  fontFamily: "var(--az-font-mono)",
  fontSize: 22,
  fontWeight: 600,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  minHeight: 44,
});

export const Pad = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: tokens.s[2],
  flex: 1,
});

export const Btn = styled.button<{ variant?: "op" | "primary" | "wide" }>(
  ({ variant }) => ({
    background:
      variant === "primary"
        ? "var(--az-primary)"
        : variant === "op"
          ? tokens.bg3
          : tokens.bg2,
    color: variant === "primary" ? "#fff" : tokens.text,
    border: `1px solid ${tokens.line}`,
    borderRadius: tokens.r.md,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "inherit",
    cursor: "pointer",
    gridColumn: variant === "wide" ? "span 2" : undefined,
    "&:hover": { filter: "brightness(1.05)" },
    "&:focus-visible": {
      outline: `2px solid ${tokens.ocean[500]}`,
      outlineOffset: 1,
    },
  }),
);
