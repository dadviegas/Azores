import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Wrap = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  height: "100%",
  minHeight: 0,
});

export const Header = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  fontSize: 11,
  color: tokens.text3,
});

export const List = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[2],
  overflowY: "auto",
  flex: 1,
  minHeight: 0,
});

export const Row = styled.li({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: tokens.s[3],
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  background: tokens.bg2,
  borderRadius: tokens.r.md,
});

export const Mag = styled.span<{ severity: "low" | "med" | "high" }>(
  ({ severity }) => ({
    fontFamily: tokens.font.mono,
    fontSize: 14,
    fontWeight: 700,
    minWidth: 36,
    textAlign: "center",
    padding: `${tokens.s[1]} ${tokens.s[2]}`,
    borderRadius: tokens.r.sm,
    color: "var(--az-bg)",
    background:
      severity === "high"
        ? tokens.coral[500]
        : severity === "med"
          ? tokens.amber[500]
          : tokens.moss[500],
  }),
);

export const Place = styled.span({
  fontSize: 12,
  color: tokens.text,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const When = styled.time({
  fontSize: 10,
  color: tokens.text3,
  fontVariantNumeric: "tabular-nums",
});
