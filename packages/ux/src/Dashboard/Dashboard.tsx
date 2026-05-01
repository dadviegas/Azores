import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "@azores/ui";
import {
  packWidgets,
  reorderForInsertion,
  type GridItem,
  type PlacedItem,
} from "./layout.js";
import { SizeGlyph } from "./SizeGlyph.js";
import {
  Body,
  Cell,
  DragHandle,
  Ghost,
  Grid,
  GridBackdrop,
  Header,
  HeaderAction,
  HeaderActions,
  ResizeHandle,
  SizeReadout,
  Title,
} from "./Dashboard.styles.js";

export type DashboardWidget<T = unknown> = GridItem & {
  type: string;
  data?: T;
};

export type DashboardWidgetAction = {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
};

export type DashboardRenderContext<T> = {
  widget: PlacedItem<DashboardWidget<T>>;
  isResizing: boolean;
};

export type DashboardSizePreset = {
  key: string;
  label: string;
  w: number;
  h: number;
};

// Default ladder used when the consumer doesn't pass `sizePresets`. Tuned for
// 12-col grids; the largest is auto-clamped to `cols` at render time. h>=2
// keeps the body at least ~5× the header height — h:1 squashes widgets so
// only the chrome is readable.
const DEFAULT_SIZE_PRESETS: DashboardSizePreset[] = [
  { key: "S", w: 3, h: 2, label: "Small" },
  { key: "M", w: 4, h: 2, label: "Medium" },
  { key: "L", w: 6, h: 2, label: "Large" },
  { key: "XL", w: 8, h: 3, label: "Extra-large" },
];

export type DashboardExternalDrag = {
  w: number;
  h: number;
  // Optional callback when the external item is dropped on a cell. The
  // consumer is responsible for appending the new widget to its state.
  onDrop: (cell: { col: number; row: number }, e: React.DragEvent<HTMLDivElement>) => void;
};

export type DashboardProps<T = unknown> = {
  widgets: ReadonlyArray<DashboardWidget<T>>;
  onChange: (next: DashboardWidget<T>[]) => void;
  renderTitle: (widget: DashboardWidget<T>) => ReactNode;
  renderBody: (ctx: DashboardRenderContext<T>) => ReactNode;
  widgetActions?: (widget: DashboardWidget<T>) => DashboardWidgetAction[];
  cols?: number;
  rowHeight?: number;
  gap?: number;
  minWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  sizePresets?: ReadonlyArray<DashboardSizePreset>;
  enableSizeCycle?: boolean;
  externalDrag?: DashboardExternalDrag | null;
};

type DragState = {
  id: string;
  w: number;
  h: number;
  ghost: { col: number; row: number } | null;
};

type ExternalDragState = {
  w: number;
  h: number;
  ghost: { col: number; row: number } | null;
};

const DEFAULT_COLS = 12;
const DEFAULT_ROW_HEIGHT = 92;
const DEFAULT_GAP = 12;

const sizeKey = (
  w: number,
  h: number,
  presets: ReadonlyArray<DashboardSizePreset>,
): string => presets.find((s) => s.w === w && s.h === h)?.key ?? `${w}×${h}`;

const nextPreset = (
  w: number,
  h: number,
  presets: ReadonlyArray<DashboardSizePreset>,
  cols: number,
): DashboardSizePreset => {
  const usable = presets.map((p) => ({ ...p, w: Math.min(p.w, cols) }));
  const idx = usable.findIndex((s) => s.w === w && s.h === h);
  return usable[(idx + 1) % usable.length] ?? usable[0]!;
};

export const Dashboard = <T,>({
  widgets,
  onChange,
  renderTitle,
  renderBody,
  widgetActions,
  cols = DEFAULT_COLS,
  rowHeight = DEFAULT_ROW_HEIGHT,
  gap = DEFAULT_GAP,
  minWidth = 2,
  minHeight = 2,
  maxHeight = 6,
  sizePresets = DEFAULT_SIZE_PRESETS,
  enableSizeCycle = true,
  externalDrag = null,
}: DashboardProps<T>): JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [externalGhost, setExternalGhost] = useState<ExternalDragState | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);

  // Square cells — measure the live column width and use it as the row height
  // so each grid track is a perfect square. A widget at `w:4, h:2` is then
  // visually 4×2 squares, and the backdrop dashed cells render as squares.
  // Falls back to the `rowHeight` prop until the first measurement lands.
  const [measuredRowH, setMeasuredRowH] = useState<number | null>(null);
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = (): void => {
      const w = grid.getBoundingClientRect().width;
      if (w <= 0) return;
      const colW = (w - gap * (cols - 1)) / cols;
      setMeasuredRowH(Math.max(40, Math.round(colW)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, [cols, gap]);
  const effectiveRowH = measuredRowH ?? rowHeight;

  const layout = useMemo<PlacedItem<DashboardWidget<T>>[]>(() => {
    const list =
      dragState && dragState.ghost
        ? reorderForInsertion(
            widgets,
            dragState.id,
            dragState.ghost.col,
            dragState.ghost.row,
            cols,
            dragState.w,
            dragState.h,
          )
        : [...widgets];
    return packWidgets(list, cols);
  }, [widgets, dragState, cols]);

  const totalRows = useMemo(
    () => layout.reduce((max, w) => Math.max(max, w.row + w.h), 0),
    [layout],
  );

  // FLIP — capture pre-layout box, run (translate, scale)→identity transition.
  // The dragged cell skips entirely (pointer drives it). For the resizing cell
  // we also apply scale-FLIP so each grid-snap step animates as a smooth
  // grow/shrink from the previous size, instead of jumping instantly to the
  // new track count. Neighbors translate-FLIP into their displaced positions.
  const positionsRef = useRef<
    Map<string, { x: number; y: number; w: number; h: number }>
  >(new Map());
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cellsEls = grid.querySelectorAll<HTMLElement>("[data-wid]");
    const next = new Map<string, { x: number; y: number; w: number; h: number }>();
    const draggedId = dragState?.id ?? null;
    cellsEls.forEach((el) => {
      const id = el.dataset.wid;
      if (!id) return;
      const r = el.getBoundingClientRect();
      next.set(id, { x: r.left, y: r.top, w: r.width, h: r.height });
      if (id === draggedId) return;
      const prev = positionsRef.current.get(id);
      if (!prev) return;
      const dx = prev.x - r.left;
      const dy = prev.y - r.top;
      // Only the resizing cell uses scale-FLIP; neighbors keep crisp content
      // (scaling them would blur text during a drag-displacement).
      const isResizingCell = id === resizingId;
      const sx = isResizingCell && r.width > 0 ? prev.w / r.width : 1;
      const sy = isResizingCell && r.height > 0 ? prev.h / r.height : 1;
      const noMove = Math.abs(dx) < 1 && Math.abs(dy) < 1;
      const noScale = Math.abs(sx - 1) < 0.005 && Math.abs(sy - 1) < 0.005;
      if (noMove && noScale) return;
      el.style.transition = "none";
      el.style.transformOrigin = "top left";
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      // Force reflow, then animate to identity on next frame.
      void el.offsetWidth;
      requestAnimationFrame(() => {
        el.style.transition =
          "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)";
        el.style.transform = "";
      });
    });
    positionsRef.current = next;
  });

  const cellFromEvent = useCallback(
    (e: { clientX: number; clientY: number }): { col: number; row: number } | null => {
      const grid = gridRef.current;
      if (!grid) return null;
      const rect = grid.getBoundingClientRect();
      const colW = (rect.width - gap * (cols - 1)) / cols;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.max(0, Math.min(cols - 1, Math.round(x / (colW + gap))));
      const row = Math.max(0, Math.floor(y / (effectiveRowH + gap)));
      return { col, row };
    },
    [cols, gap, effectiveRowH],
  );

  const onDragStartCell =
    (id: string) =>
    (e: React.DragEvent<HTMLDivElement>): void => {
      const w = widgets.find((x) => x.id === id);
      if (!w) return;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", id);
      setDragState({ id, w: w.w, h: w.h, ghost: null });
    };

  const onDragOverGrid = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const cell = cellFromEvent(e);
    if (!cell) return;
    if (dragState) {
      setDragState((prev) => {
        if (!prev) return prev;
        if (prev.ghost && prev.ghost.col === cell.col && prev.ghost.row === cell.row) return prev;
        return { ...prev, ghost: cell };
      });
      return;
    }
    if (externalDrag) {
      setExternalGhost((prev) => {
        if (prev && prev.ghost && prev.ghost.col === cell.col && prev.ghost.row === cell.row) {
          return prev;
        }
        return { w: externalDrag.w, h: externalDrag.h, ghost: cell };
      });
    }
  };

  const onDragLeaveGrid = (e: React.DragEvent<HTMLDivElement>): void => {
    // Only clear when leaving the grid root, not crossing into a child cell.
    if (e.currentTarget === e.target) setExternalGhost(null);
  };

  const onDropGrid = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const cell = cellFromEvent(e);
    if (!cell) {
      setDragState(null);
      setExternalGhost(null);
      return;
    }
    if (dragState) {
      const next = reorderForInsertion(
        widgets,
        dragState.id,
        cell.col,
        cell.row,
        cols,
        dragState.w,
        dragState.h,
      );
      onChange(next);
      setDragState(null);
      return;
    }
    if (externalDrag) {
      externalDrag.onDrop(cell, e);
      setExternalGhost(null);
    }
  };

  const cycleSize = (id: string): void => {
    const w = widgets.find((x) => x.id === id);
    if (!w) return;
    const next = nextPreset(w.w, w.h, sizePresets, cols);
    onChange(widgets.map((x) => (x.id === id ? { ...x, w: next.w, h: next.h } : x)));
  };

  const startResize =
    (id: string) =>
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      const widget = widgets.find((w) => w.id === id);
      const grid = gridRef.current;
      if (!widget || !grid) return;
      setResizingId(id);
      const startX = e.clientX;
      const startY = e.clientY;
      const startW = widget.w;
      const startH = widget.h;
      const colW = (grid.getBoundingClientRect().width - gap * (cols - 1)) / cols;
      let lastW = startW;
      let lastH = startH;

      const onMove = (ev: MouseEvent): void => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const newW = Math.max(minWidth, Math.min(cols, Math.round(startW + dx / (colW + gap))));
        const newH = Math.max(
          minHeight,
          Math.min(maxHeight, Math.round(startH + dy / (effectiveRowH + gap))),
        );
        if (newW === lastW && newH === lastH) return;
        lastW = newW;
        lastH = newH;
        onChange(widgets.map((w) => (w.id === id ? { ...w, w: newW, h: newH } : w)));
      };
      const onUp = (): void => {
        setResizingId(null);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };

  const backdropRows = Math.max(totalRows + 2, 6);
  const backdropCellCount = cols * backdropRows;
  const isDragging =
    dragState !== null || externalGhost !== null || resizingId !== null;
  const draggedId = dragState?.id ?? null;
  const internalGhost = dragState?.ghost ?? null;
  const externalGhostPos = externalGhost?.ghost ?? null;

  return (
    <Grid
      ref={gridRef}
      $cols={cols}
      $rowH={effectiveRowH}
      $gap={gap}
      onDragOver={onDragOverGrid}
      onDragLeave={onDragLeaveGrid}
      onDrop={onDropGrid}
    >
      <GridBackdrop
        $cols={cols}
        $rowH={effectiveRowH}
        $gap={gap}
        data-active={isDragging}
      >
        {Array.from({ length: backdropCellCount }).map((_, i) => (
          <div key={i} />
        ))}
      </GridBackdrop>

      {internalGhost && dragState ? (
        <Ghost $col={internalGhost.col} $row={internalGhost.row} $w={dragState.w} $h={dragState.h}>
          Drop here
        </Ghost>
      ) : null}

      {externalGhostPos && externalGhost ? (
        <Ghost
          $col={externalGhostPos.col}
          $row={externalGhostPos.row}
          $w={Math.min(externalGhost.w, cols)}
          $h={externalGhost.h}
        >
          + Drop to add
        </Ghost>
      ) : null}


      {layout.map((w) => {
        const dragging = draggedId === w.id;
        const consumerActions = widgetActions ? widgetActions(w) : [];
        const resizing = resizingId === w.id;
        const sk = sizeKey(w.w, w.h, sizePresets);
        return (
          <Cell
            key={w.id}
            data-wid={w.id}
            $col={w.col}
            $row={w.row}
            $w={w.w}
            $h={w.h}
            $dragging={dragging}
            draggable
            onDragStart={onDragStartCell(w.id)}
            onDragEnd={() => setDragState(null)}
          >
            <Header>
              <DragHandle aria-label="Drag widget" tabIndex={-1}>
                <Icon name="drag" size={12} />
              </DragHandle>
              <Title>{renderTitle(w)}</Title>
              <HeaderActions>
                {enableSizeCycle ? (
                  <HeaderAction
                    type="button"
                    title={`Size: ${sk} — click to cycle`}
                    aria-label={`Cycle size, current ${sk}`}
                    draggable={false}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => cycleSize(w.id)}
                  >
                    <SizeGlyph w={w.w} h={w.h} cols={cols} />
                  </HeaderAction>
                ) : null}
                {consumerActions.map((a) => (
                  <HeaderAction
                    key={a.id}
                    type="button"
                    title={a.label}
                    aria-label={a.label}
                    draggable={false}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={a.onClick}
                  >
                    <Icon name={a.icon} size={12} />
                  </HeaderAction>
                ))}
              </HeaderActions>
            </Header>
            <Body>{renderBody({ widget: w, isResizing: resizing })}</Body>
            <ResizeHandle
              onMouseDown={startResize(w.id)}
              aria-label="Resize widget"
              draggable={false}
            />
            {resizing ? (
              <SizeReadout>
                {w.w}×{w.h}
              </SizeReadout>
            ) : null}
          </Cell>
        );
      })}
    </Grid>
  );
};
