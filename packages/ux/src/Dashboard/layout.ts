// Pure layout helpers for the dashboard grid.
// Ported from docs/design/Azores/page-ux.jsx (packWidgets + reorderForInsertion).

export type GridItem = {
  id: string;
  w: number;
  h: number;
};

export type PlacedItem<T extends GridItem> = T & { col: number; row: number };

const ROWS_MAX = 60;

export const packWidgets = <T extends GridItem>(
  items: ReadonlyArray<T>,
  cols: number,
): PlacedItem<T>[] => {
  const occ: boolean[][] = [];
  const ensureRow = (r: number): void => {
    while (occ.length <= r) occ.push(new Array(cols).fill(false));
  };
  const fits = (r: number, c: number, w: number, h: number): boolean => {
    if (c + w > cols) return false;
    for (let dr = 0; dr < h; dr++) {
      ensureRow(r + dr);
      const row = occ[r + dr];
      if (!row) return false;
      for (let dc = 0; dc < w; dc++) {
        if (row[c + dc]) return false;
      }
    }
    return true;
  };
  const mark = (r: number, c: number, w: number, h: number): void => {
    for (let dr = 0; dr < h; dr++) {
      ensureRow(r + dr);
      const row = occ[r + dr];
      if (!row) continue;
      for (let dc = 0; dc < w; dc++) row[c + dc] = true;
    }
  };

  const out: PlacedItem<T>[] = [];
  for (const it of items) {
    const w = Math.min(it.w, cols);
    const h = it.h;
    let placed = false;
    for (let r = 0; r < ROWS_MAX && !placed; r++) {
      for (let c = 0; c <= cols - w && !placed; c++) {
        if (fits(r, c, w, h)) {
          mark(r, c, w, h);
          out.push({ ...it, col: c, row: r, w, h });
          placed = true;
        }
      }
    }
    if (!placed) out.push({ ...it, col: 0, row: occ.length, w, h });
  }
  return out;
};

// Re-order list so dragId moves to a slot whose nearest existing widget is the
// one currently under the cursor. Packing then handles the actual flow.
export const reorderForInsertion = <T extends GridItem>(
  items: ReadonlyArray<T>,
  dragId: string,
  targetCol: number,
  targetRow: number,
  cols: number,
  ghostW?: number,
  ghostH?: number,
): T[] => {
  const without = items.filter((w) => w.id !== dragId);
  const dragged = items.find((w) => w.id === dragId);
  if (!dragged) return [...items];
  const ghost: T = { ...dragged, w: ghostW ?? dragged.w, h: ghostH ?? dragged.h };
  const packed = packWidgets(without, cols);
  const targetKey = targetRow * cols + targetCol;
  let insertIdx = packed.length;
  for (let i = 0; i < packed.length; i++) {
    const p = packed[i];
    if (!p) continue;
    const k = p.row * cols + p.col;
    if (k >= targetKey) {
      insertIdx = i;
      break;
    }
  }
  const next = [...without];
  next.splice(insertIdx, 0, ghost);
  return next;
};
