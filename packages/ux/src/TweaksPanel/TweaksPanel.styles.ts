import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Section = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: tokens.s[3],
  marginBottom: tokens.s[6],
});

export const SectionTitle = styled.div({
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: tokens.muted,
  fontWeight: tokens.fw.medium,
});

export const SegGroup = styled.div({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: "1fr",
  padding: "3px",
  background: tokens.bg2,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.md,
  gap: "2px",
});

export const SegButton = styled.button<{ $active: boolean }>(({ $active }) => ({
  appearance: "none",
  border: "none",
  background: $active ? tokens.surface : "transparent",
  color: $active ? tokens.text : tokens.text2,
  borderRadius: tokens.r.sm,
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  fontFamily: "inherit",
  fontSize: tokens.fs.sm,
  fontWeight: $active ? tokens.fw.medium : tokens.fw.regular,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: tokens.s[2],
  boxShadow: $active ? tokens.shadow.xs : "none",
  transition: `background ${tokens.dur.fast} ${tokens.ease}`,
}));

export const AccentGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: tokens.s[2],
});

export const Field = styled.label({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: 11,
  color: tokens.text3,
});

export const Input = styled.input({
  background: tokens.bg2,
  color: tokens.text,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.sm,
  padding: "6px 8px",
  fontFamily: "var(--az-font-mono)",
  fontSize: 12,
  outline: "none",
});

export const Hint = styled.div({
  fontSize: 10,
  color: tokens.text3,
  lineHeight: 1.4,
});

export const AccentButton = styled.button<{ $active: boolean; $color: string }>(
  ({ $active, $color }) => ({
    appearance: "none",
    display: "flex",
    alignItems: "center",
    gap: tokens.s[2],
    padding: `${tokens.s[2]} ${tokens.s[3]}`,
    border: `1px solid ${$active ? tokens.text2 : tokens.line}`,
    borderRadius: tokens.r.sm,
    background: $active ? tokens.bg2 : tokens.surface,
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: tokens.fs.sm,
    cursor: "pointer",
    "&::before": {
      content: '""',
      width: "12px",
      height: "12px",
      borderRadius: "999px",
      background: $color,
      flexShrink: 0,
    },
  }),
);
