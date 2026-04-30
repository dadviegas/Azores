import {
  useCallback,
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
};

type DragState = {
  id: string;
  w: number;
  h: number;
  ghost: { col: number; row: number } | null;
};

const DEFAULT_COLS = 12;
const DEFAULT_ROW_HEIGHT = 92;
const DEFAULT_GAP = 12;

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
  minHeight = 1,
  maxHeight = 6,
}: DashboardProps<T>): JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizingId, setResizingId] = useState<string | null>(null);

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

  const cellFromEvent = useCallback(
    (e: { clientX: number; clientY: number }): { col: number; row: number } | null => {
      const grid = gridRef.current;
      if (!grid) return null;
      const rect = grid.getBoundingClientRect();
      const colW = (rect.width - gap * (cols - 1)) / cols;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.max(0, Math.min(cols - 1, Math.round(x / (colW + gap))));
      const row = Math.max(0, Math.floor(y / (rowHeight + gap)));
      return { col, row };
    },
    [cols, gap, rowHeight],
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
    setDragState((prev) => {
      if (!prev) return prev;
      if (prev.ghost && prev.ghost.col === cell.col && prev.ghost.row === cell.row) return prev;
      return { ...prev, ghost: cell };
    });
  };

  const onDropGrid = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const cell = cellFromEvent(e);
    if (!cell || !dragState) {
      setDragState(null);
      return;
    }
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

      const onMove = (ev: MouseEvent): void => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const newW = Math.max(minWidth, Math.min(cols, Math.round(startW + dx / (colW + gap))));
        const newH = Math.max(
          minHeight,
          Math.min(maxHeight, Math.round(startH + dy / (rowHeight + gap))),
        );
        if (newW === widget.w && newH === widget.h) return;
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
  const isDragging = dragState !== null;
  const ghostPos = dragState?.ghost ?? null;
  const draggedId = dragState?.id ?? null;

  return (
    <Grid
      ref={gridRef}
      $cols={cols}
      $rowH={rowHeight}
      $gap={gap}
      onDragOver={onDragOverGrid}
      onDrop={onDropGrid}
    >
      <GridBackdrop
        $cols={cols}
        $rowH={rowHeight}
        $gap={gap}
        $rows={backdropRows}
        data-active={isDragging}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} />
        ))}
      </GridBackdrop>

      {ghostPos && dragState ? (
        <Ghost $col={ghostPos.col} $row={ghostPos.row} $w={dragState.w} $h={dragState.h}>
          Drop here
        </Ghost>
      ) : null}

      {layout.map((w) => {
        const dragging = draggedId === w.id;
        const actions = widgetActions ? widgetActions(w) : [];
        const resizing = resizingId === w.id;
        return (
          <Cell
            key={w.id}
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
              {actions.length > 0 ? (
                <HeaderActions>
                  {actions.map((a) => (
                    <HeaderAction
                      key={a.id}
                      type="button"
                      title={a.label}
                      aria-label={a.label}
                      onClick={a.onClick}
                    >
                      <Icon name={a.icon} size={12} />
                    </HeaderAction>
                  ))}
                </HeaderActions>
              ) : null}
            </Header>
            <Body>{renderBody({ widget: w, isResizing: resizing })}</Body>
            <ResizeHandle onMouseDown={startResize(w.id)} aria-label="Resize widget" />
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
