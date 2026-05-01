// 4×3 SVG mini-grid that visualises a widget's footprint. Used by the
// Dashboard's built-in size-cycle action so the user sees the proportional
// shape they're cycling to instead of a generic resize icon.

export type SizeGlyphProps = {
  w: number;
  h: number;
  cols: number;
};

export const SizeGlyph = ({ w, h, cols }: SizeGlyphProps): JSX.Element => {
  const gx = 4;
  const gy = 3;
  const fillW = Math.max(1, Math.min(gx, Math.round((w / cols) * gx + 0.0001)));
  const fillH = Math.max(1, Math.min(gy, h));
  const cell = 3;
  const gap = 1;
  const totalW = gx * cell + (gx - 1) * gap;
  const totalH = gy * cell + (gy - 1) * gap;
  return (
    <svg width="14" height="14" viewBox={`0 0 ${totalW} ${totalH}`} aria-hidden="true">
      {Array.from({ length: gy }).map((_, r) =>
        Array.from({ length: gx }).map((_, c) => {
          const filled = r < fillH && c < fillW;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * (cell + gap)}
              y={r * (cell + gap)}
              width={cell}
              height={cell}
              rx="0.5"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity={filled ? 1 : 0.35}
            />
          );
        }),
      )}
    </svg>
  );
};
