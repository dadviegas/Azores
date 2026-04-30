import type { ChartData } from "./parse.js";

const W = 600;
const H = 240;
const PAD = 36;
const COLORS = ["var(--az-primary)", "var(--az-lava-400)", "var(--az-moss-500)"];

export const Chart = ({ data }: { data: ChartData }): JSX.Element => {
  const { type = "line", title, series = [], labels = [] } = data;

  if (type === "bar") {
    const all = series[0]?.data ?? [];
    const max = Math.max(1, ...all);
    const bw = (W - PAD * 2) / Math.max(1, all.length);
    return (
      <div className="az-md-chart">
        {title ? <div className="az-md-chart-title">{title}</div> : null}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 240 }}>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={PAD}
              y1={PAD + (i * (H - PAD * 2)) / 3}
              x2={W - PAD}
              y2={PAD + (i * (H - PAD * 2)) / 3}
              stroke="var(--az-line)"
              strokeDasharray="2 4"
            />
          ))}
          {all.map((v, i) => {
            const h = (v / max) * (H - PAD * 2);
            return (
              <rect
                key={i}
                x={PAD + i * bw + 4}
                y={H - PAD - h}
                width={bw - 8}
                height={h}
                fill="var(--az-primary)"
                rx="3"
              />
            );
          })}
          {labels.map((l, i) => (
            <text
              key={i}
              x={PAD + i * bw + bw / 2}
              y={H - 12}
              textAnchor="middle"
              fontSize="11"
              fill="var(--az-text-3)"
            >
              {l}
            </text>
          ))}
        </svg>
      </div>
    );
  }

  const allVals = series.flatMap((s) => s.data);
  const max = Math.max(...allVals, 1);
  const min = Math.min(...allVals, 0);
  const range = max - min || 1;
  return (
    <div className="az-md-chart">
      {title ? <div className="az-md-chart-title">{title}</div> : null}
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 240 }}>
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={PAD}
            y1={PAD + (i * (H - PAD * 2)) / 3}
            x2={W - PAD}
            y2={PAD + (i * (H - PAD * 2)) / 3}
            stroke="var(--az-line)"
            strokeDasharray="2 4"
          />
        ))}
        {series.map((s, si) => {
          const len = Math.max(1, s.data.length - 1);
          const xs = s.data.map((_, i) => PAD + (i * (W - PAD * 2)) / len);
          const ys = s.data.map((v) => H - PAD - ((v - min) / range) * (H - PAD * 2));
          const d = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${ys[i]}`).join(" ");
          return (
            <path
              key={si}
              d={d}
              fill="none"
              stroke={COLORS[si % COLORS.length]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
        {labels.map((l, i) => {
          const x = PAD + (i * (W - PAD * 2)) / Math.max(1, labels.length - 1);
          return (
            <text key={i} x={x} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--az-text-3)">
              {l}
            </text>
          );
        })}
        {series.map((s, si) => (
          <g key={si}>
            <rect
              x={PAD + si * 100}
              y={8}
              width={10}
              height={10}
              fill={COLORS[si % COLORS.length]}
              rx="2"
            />
            <text x={PAD + si * 100 + 16} y={17} fontSize="11" fill="var(--az-text-2)">
              {s.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
