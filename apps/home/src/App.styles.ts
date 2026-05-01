import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Shell = styled.div({
  position: "relative",
  minHeight: "100dvh",
  isolation: "isolate",
});

export const Page = styled.div({
  position: "relative",
  zIndex: 1,
  maxWidth: 1100,
  margin: "0 auto",
  padding: "48px 32px 64px",
});

export const Eyebrow = styled.div({
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: tokens.text3,
  fontWeight: tokens.fw.semi,
  marginBottom: 8,
});

export const Title = styled.h1({
  fontFamily: tokens.font.display,
  fontWeight: 500,
  fontSize: 48,
  letterSpacing: "-0.02em",
  margin: "0 0 12px",
});

export const Grid = styled.div({
  marginTop: 40,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 16,
});

type TileProps = { $accent: "ocean" | "lava" | "moss" | "amber"; $launchable: boolean };

export const Tile = styled.div<TileProps>(({ $accent, $launchable }) => ({
  position: "relative",
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: tokens.r.lg,
  padding: "20px 20px 18px",
  display: "flex",
  flexDirection: "column",
  gap: 14,
  cursor: $launchable ? "pointer" : "default",
  transition: `transform ${tokens.dur.fast} ${tokens.ease}, box-shadow ${tokens.dur.fast} ${tokens.ease}, border-color ${tokens.dur.fast} ${tokens.ease}`,
  opacity: $launchable ? 1 : 0.7,
  "&:hover": $launchable
    ? {
        transform: "translateY(-2px)",
        boxShadow: tokens.shadow.md,
        borderColor: `var(--az-${$accent}-400)`,
      }
    : {},
  "&:focus-visible": {
    outline: `2px solid ${tokens.primary}`,
    outlineOffset: 2,
  },
  "& .az-tile-icon": {
    display: "inline-grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: tokens.r.md,
    background: `var(--az-${$accent}-50)`,
    color: `var(--az-${$accent}-500)`,
    border: `1px solid var(--az-${$accent}-200, ${tokens.line})`,
  },
}));

export const TileHead = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const TileBody = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  flex: 1,
});
