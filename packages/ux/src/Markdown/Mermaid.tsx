// Very basic mermaid flowchart renderer. Ported from
// docs/design/Azores/page-markdown.jsx — supports `graph TD/LR/TB/RL` with
// node shapes (rect / round / rhombus) and labelled arrows.

type NodeShape = "rect" | "round" | "rhombus";
type GraphNode = { id: string; label: string; shape: NodeShape };
type GraphEdge = { a: string; b: string; label: string };

const parseSide = (
  side: string,
  nodes: Record<string, GraphNode>,
): string | null => {
  const m = side.trim().match(/^([A-Za-z0-9_]+)(?:\[([^\]]+)\]|\(([^)]+)\)|\{([^}]+)\})?/);
  if (!m) return null;
  const id = m[1]!;
  const label = m[2] ?? m[3] ?? m[4] ?? id;
  const shape: NodeShape = m[2] ? "rect" : m[3] ? "round" : m[4] ? "rhombus" : "rect";
  if (!nodes[id]) nodes[id] = { id, label, shape };
  else if (m[2] || m[3] || m[4]) nodes[id] = { id, label, shape };
  return id;
};

export const Mermaid = ({ code }: { code: string }): JSX.Element | null => {
  const lines = code.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  const dir = (lines[0]?.match(/graph (LR|TD|TB|RL)/) ?? [])[1] ?? "TD";
  const horiz = dir === "LR" || dir === "RL";

  const nodes: Record<string, GraphNode> = {};
  const edges: GraphEdge[] = [];

  for (let li = 1; li < lines.length; li++) {
    const ln = lines[li]!;
    const arrowM =
      ln.match(/(.+?)\s*--\s*(?:\|([^|]+)\|\s*)?-->\s*(.+)/) ?? ln.match(/(.+?)\s*-->\s*(.+)/);
    if (!arrowM) continue;
    const left = arrowM[1] ?? "";
    const label = arrowM.length === 4 ? (arrowM[2] ?? "") : "";
    const right = arrowM.length === 4 ? (arrowM[3] ?? "") : (arrowM[2] ?? "");
    const a = parseSide(left, nodes);
    const b = parseSide(right, nodes);
    if (a && b) edges.push({ a, b, label });
  }

  const ids = Object.keys(nodes);
  if (ids.length === 0) return null;

  const adj: Record<string, string[]> = {};
  const indeg: Record<string, number> = {};
  ids.forEach((id) => {
    adj[id] = [];
    indeg[id] = 0;
  });
  edges.forEach(({ a, b }) => {
    adj[a]!.push(b);
    indeg[b] = (indeg[b] ?? 0) + 1;
  });

  const layers: string[][] = [];
  let frontier = ids.filter((id) => indeg[id] === 0);
  const seen = new Set<string>();
  while (frontier.length) {
    layers.push(frontier);
    frontier.forEach((id) => seen.add(id));
    const next: string[] = [];
    frontier.forEach((id) => {
      adj[id]!.forEach((b) => {
        indeg[b] = (indeg[b] ?? 0) - 1;
        if (indeg[b] === 0) next.push(b);
      });
    });
    frontier = next;
  }
  ids.forEach((id) => {
    if (!seen.has(id)) {
      const last = layers[layers.length - 1] ?? [];
      layers[layers.length - 1] = last.concat(id);
    }
  });

  const nodeW = 130;
  const nodeH = 50;
  const gapX = 60;
  const gapY = 30;
  const pos: Record<string, { x: number; y: number }> = {};
  layers.forEach((layer, li) => {
    layer.forEach((id, ci) => {
      pos[id] = horiz
        ? { x: 30 + li * (nodeW + gapX), y: 30 + ci * (nodeH + gapY) }
        : { x: 30 + ci * (nodeW + gapX), y: 30 + li * (nodeH + gapY) };
    });
  });
  const xs = Object.values(pos).map((p) => p.x + nodeW);
  const ys = Object.values(pos).map((p) => p.y + nodeH);
  const maxX = Math.max(...xs) + 30;
  const maxY = Math.max(...ys) + 30;

  return (
    <svg viewBox={`0 0 ${maxX} ${maxY}`} style={{ width: "100%", maxWidth: maxX, height: "auto" }}>
      <defs>
        <marker
          id="arr"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--az-text-3)" />
        </marker>
      </defs>
      {edges.map((e, i) => {
        const a = pos[e.a];
        const b = pos[e.b];
        if (!a || !b) return null;
        const x1 = a.x + nodeW / 2;
        const y1 = a.y + nodeH;
        const x2 = b.x + nodeW / 2;
        const y2 = b.y;
        const mx = horiz ? a.x + nodeW : x1;
        const my = horiz ? a.y + nodeH / 2 : y1;
        const ex = horiz ? b.x : x2;
        const ey = horiz ? b.y + nodeH / 2 : y2;
        const path = horiz
          ? `M ${mx} ${my} C ${(mx + ex) / 2} ${my}, ${(mx + ex) / 2} ${ey}, ${ex} ${ey}`
          : `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke="var(--az-text-3)"
              strokeWidth="1.5"
              markerEnd="url(#arr)"
            />
            {e.label ? (
              <text
                x={(mx + ex) / 2}
                y={(my + ey) / 2 - 4}
                textAnchor="middle"
                fontSize="11"
                fill="var(--az-text-2)"
                style={{ fontFamily: "var(--az-font-mono)" }}
              >
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {Object.values(nodes).map((n) => {
        const p = pos[n.id];
        if (!p) return null;
        const cx = p.x + nodeW / 2;
        const cy = p.y + nodeH / 2;
        return (
          <g key={n.id}>
            {n.shape === "rhombus" ? (
              <polygon
                points={`${cx},${p.y} ${p.x + nodeW},${cy} ${cx},${p.y + nodeH} ${p.x},${cy}`}
                fill="#FBF2DD"
                stroke="var(--az-amber-500)"
                strokeWidth="1.5"
              />
            ) : n.shape === "round" ? (
              <rect
                x={p.x}
                y={p.y}
                width={nodeW}
                height={nodeH}
                rx="20"
                fill="var(--az-lava-50)"
                stroke="var(--az-lava-400)"
                strokeWidth="1.5"
              />
            ) : (
              <rect
                x={p.x}
                y={p.y}
                width={nodeW}
                height={nodeH}
                rx="6"
                fill="var(--az-ocean-50)"
                stroke="var(--az-ocean-500)"
                strokeWidth="1.5"
              />
            )}
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="500"
              fill="#14161A"
              style={{ fontFamily: "var(--az-font-sans)" }}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
