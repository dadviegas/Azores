import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  height: "100%",
  padding: tokens.s[2],
});

export const Pad = styled.button<{ $state: "idle" | "wait" | "go" | "early" }>(
  ({ $state }) => ({
    width: "100%",
    flex: 1,
    minHeight: 90,
    border: `1px solid ${tokens.line}`,
    borderRadius: tokens.r.lg,
    fontFamily: "var(--az-font-mono)",
    fontSize: 14,
    fontWeight: 600,
    color: "#fff",
    cursor: "pointer",
    background:
      $state === "go"
        ? "#22c55e"
        : $state === "wait"
          ? "#ef4444"
          : $state === "early"
            ? "#a16207"
            : tokens.bg2,
    transition: "background 80ms",
  }),
);

export const Tag = styled.div({
  fontSize: 11,
  color: tokens.text3,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  fontFamily: "var(--az-font-mono)",
  minHeight: 16,
});
