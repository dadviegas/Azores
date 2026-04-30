import styled from "@emotion/styled";
import { tokens } from "@azores/ui";

export const Grid = styled.div<{ $cols: number; $rowH: number; $gap: number }>(
  ({ $cols, $rowH, $gap }) => ({
    position: "relative",
    display: "grid",
    gridTemplateColumns: `repeat(${$cols}, minmax(0, 1fr))`,
    gridAutoRows: `${$rowH}px`,
    gap: `${$gap}px`,
    minHeight: `${$rowH * 4}px`,
  }),
);

export const GridBackdrop = styled.div<{ $cols: number; $rowH: number; $gap: number; $rows: number }>(
  ({ $cols, $rowH, $gap, $rows }) => ({
    position: "absolute",
    inset: 0,
    display: "grid",
    gridTemplateColumns: `repeat(${$cols}, minmax(0, 1fr))`,
    gridAutoRows: `${$rowH}px`,
    gap: `${$gap}px`,
    pointerEvents: "none",
    opacity: 0,
    transition: `opacity ${tokens.dur.fast} ${tokens.ease}`,
    zIndex: 0,
    "&[data-active='true']": { opacity: 1 },
    "& > *": {
      gridColumn: "span 1",
      gridRow: `span ${$rows}`,
      borderRadius: tokens.r.md,
      background: tokens.bg2,
      border: `1px dashed ${tokens.line2}`,
    },
  }),
);

export const Cell = styled.div<{ $col: number; $row: number; $w: number; $h: number; $dragging: boolean }>(
  ({ $col, $row, $w, $h, $dragging }) => ({
    gridColumn: `${$col + 1} / span ${$w}`,
    gridRow: `${$row + 1} / span ${$h}`,
    position: "relative",
    background: tokens.surface,
    border: `1px solid ${tokens.line}`,
    borderRadius: tokens.r.lg,
    boxShadow: tokens.shadow.xs,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    opacity: $dragging ? 0.4 : 1,
    transition: `box-shadow ${tokens.dur.fast} ${tokens.ease}, opacity ${tokens.dur.fast} ${tokens.ease}`,
    "&:hover": { boxShadow: tokens.shadow.sm },
    zIndex: 1,
  }),
);

export const Ghost = styled.div<{ $col: number; $row: number; $w: number; $h: number }>(
  ({ $col, $row, $w, $h }) => ({
    gridColumn: `${$col + 1} / span ${$w}`,
    gridRow: `${$row + 1} / span ${$h}`,
    border: `2px dashed ${tokens.primary}`,
    borderRadius: tokens.r.lg,
    background: `color-mix(in srgb, ${tokens.primary} 8%, transparent)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.primary,
    fontSize: tokens.fs.xs,
    fontWeight: tokens.fw.semi,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    pointerEvents: "none",
    zIndex: 0,
  }),
);

export const Header = styled.div({
  display: "flex",
  alignItems: "center",
  gap: tokens.s[2],
  padding: `${tokens.s[2]} ${tokens.s[3]}`,
  borderBottom: `1px solid ${tokens.line}`,
  background: tokens.bg2,
  fontSize: tokens.fs.xs,
  color: tokens.text2,
});

export const DragHandle = styled.button({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: tokens.text3,
  display: "inline-grid",
  placeItems: "center",
  width: "20px",
  height: "20px",
  borderRadius: tokens.r.xs,
  cursor: "grab",
  padding: 0,
  "&:hover": { background: tokens.surface, color: tokens.text },
  "&:active": { cursor: "grabbing" },
});

export const Title = styled.span({
  flex: 1,
  fontWeight: tokens.fw.medium,
  color: tokens.text2,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontSize: "10px",
});

export const HeaderActions = styled.div({
  display: "inline-flex",
  gap: "2px",
});

export const HeaderAction = styled.button({
  appearance: "none",
  border: "none",
  background: "transparent",
  color: tokens.text3,
  display: "inline-grid",
  placeItems: "center",
  width: "20px",
  height: "20px",
  borderRadius: tokens.r.xs,
  cursor: "pointer",
  padding: 0,
  fontFamily: "inherit",
  "&:hover": { background: tokens.surface, color: tokens.text },
});

export const Body = styled.div({
  flex: 1,
  minHeight: 0,
  padding: tokens.s[4],
  overflow: "hidden",
});

export const ResizeHandle = styled.div({
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "16px",
  height: "16px",
  cursor: "nwse-resize",
  background:
    "linear-gradient(135deg, transparent 0 50%, var(--az-text-3) 50% 55%, transparent 55% 70%, var(--az-text-3) 70% 75%, transparent 75%)",
  opacity: 0.5,
  "&:hover": { opacity: 1 },
});

export const SizeReadout = styled.div({
  position: "absolute",
  bottom: "4px",
  left: tokens.s[2],
  fontSize: "10px",
  color: tokens.text3,
  fontFamily: tokens.font.mono,
  background: tokens.surface,
  padding: "1px 6px",
  borderRadius: tokens.r.xs,
  border: `1px solid ${tokens.line}`,
});
