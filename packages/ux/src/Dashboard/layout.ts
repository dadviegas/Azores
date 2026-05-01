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

// Find the largest empty rectangle inside the current packed grid that fits
// within `[minW..maxW] × [minH..maxH]`. Used when adding a widget from the
// catalog: instead of always seeding the manifest's default size and pushing
// the new tile to the end of the grid, we look for an existing gap and size
// the new widget to fill it (clamped to the catalog default, never larger).
//
// Returns `null` when no usable gap exists — caller falls back to the default
// size and `packWidgets` appends past the last row.
export const findFirstGap = <T extends GridItem>(
  packed: ReadonlyArray<PlacedItem<T>>,
  cols: number,
  maxW: number,
  maxH: number,
  minW: number,
  minH: number,
): { w: number; h: number } | null => {
  const lastRow = packed.reduce((m, p) => Math.max(m, p.row + p.h), 0);
  if (lastRow === 0) return null;
  const occ: boolean[][] = Array.from({ length: lastRow }, () =>
    new Array<boolean>(cols).fill(false),
  );
  for (const p of packed) {
    for (let dr = 0; dr < p.h; dr++) {
      for (let dc = 0; dc < p.w; dc++) {
        const row = occ[p.row + dr];
        if (row) row[p.col + dc] = true;
      }
    }
  }
  // Scan row-major; the first gap in reading order is what the user
  // perceives as "the obvious empty spot".
  for (let r = 0; r < lastRow; r++) {
    for (let c = 0; c < cols; c++) {
      if (occ[r]![c]) continue;
      // Max contiguous empty width starting at (r,c).
      let runW = 0;
      while (c + runW < cols && !occ[r]![c + runW]) runW++;
      if (runW < minW) continue;
      const w = Math.min(maxW, runW);
      // Max contiguous empty height for that width.
      let runH = 0;
      outer: while (r + runH < lastRow) {
        const row = occ[r + runH]!;
        for (let dc = 0; dc < w; dc++) {
          if (row[c + dc]) break outer;
        }
        runH++;
      }
      if (runH < minH) continue;
      return { w, h: Math.min(maxH, runH) };
    }
  }
  return null;
};

// Re-order list so dragId moves to a slot whose nearest existing widget is the
// one currently under the cursor. Packing then handles the actual flow.
//
// Vertical-aware: a packed widget covers rows `[row, row + h)` and cols
// `[col, col + w)`. The insertion point should land *before* any widget whose
// occupied region starts at-or-after the target — using the top-left key
// alone (row*cols+col) skips past tall widgets when the cursor lands inside
// their middle rows. Use a center-distance tiebreak so dropping anywhere on
// a tall widget reliably lands next to it.
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
  if (packed.length === 0) return [ghost];

  // Find the packed widget whose region the target cell lies in; if none,
  // pick the nearest by center distance.
  let nearestIdx = 0;
  let nearestDist = Infinity;
  let containingIdx = -1;
  for (let i = 0; i < packed.length; i++) {
    const p = packed[i];
    if (!p) continue;
    const inside =
      targetCol >= p.col &&
      targetCol < p.col + p.w &&
      targetRow >= p.row &&
      targetRow < p.row + p.h;
    if (inside) {
      containingIdx = i;
      break;
    }
    const cx = p.col + p.w / 2;
    const cy = p.row + p.h / 2;
    const dx = cx - targetCol;
    const dy = (cy - targetRow) * cols; // weight rows by cols so vertical wins
    const d = dx * dx + dy * dy;
    if (d < nearestDist) {
      nearestDist = d;
      nearestIdx = i;
    }
  }

  const anchorIdx = containingIdx >= 0 ? containingIdx : nearestIdx;
  const anchor = packed[anchorIdx]!;
  // Insert before the anchor when the target sits in its first half
  // (vertically), after when it sits in the second half. This makes vertical
  // reordering predictable: dragging above a widget's center inserts above,
  // below center inserts below.
  const anchorMidRow = anchor.row + anchor.h / 2;
  const insertAfter = targetRow >= anchorMidRow;
  const insertIdx = insertAfter ? anchorIdx + 1 : anchorIdx;

  const next = [...without];
  next.splice(insertIdx, 0, ghost);
  return next;
};
