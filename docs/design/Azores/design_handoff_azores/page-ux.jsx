// Azores — UX Dashboard with drag/drop/resize widgets and corporate backgrounds
const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM, useLayoutEffect: uLE } = React;

/* ------------- Backgrounds ------------- */
const BACKGROUNDS = {
  paper: { name: "Paper", style: { background: "var(--az-bg)" } },
  grid: {
    name: "Grid",
    style: {
      background: `
        linear-gradient(var(--az-line) 1px, transparent 1px) 0 0 / 32px 32px,
        linear-gradient(90deg, var(--az-line) 1px, transparent 1px) 0 0 / 32px 32px,
        var(--az-bg)`,
    },
  },
  dot: {
    name: "Dot",
    style: {
      background: `radial-gradient(circle, var(--az-line-2) 1px, transparent 1px) 0 0 / 22px 22px, var(--az-bg)`,
    },
  },
  topo: {
    name: "Topographic",
    style: {
      backgroundColor: "var(--az-bg)",
      backgroundImage: `
        radial-gradient(ellipse 800px 400px at 20% 30%, color-mix(in srgb, var(--az-ocean-100) 60%, transparent), transparent 70%),
        radial-gradient(ellipse 600px 300px at 80% 70%, color-mix(in srgb, var(--az-lava-100) 40%, transparent), transparent 70%),
        repeating-radial-gradient(circle at 30% 30%, transparent 0, transparent 30px, color-mix(in srgb, var(--az-ocean-200) 25%, transparent) 30px, color-mix(in srgb, var(--az-ocean-200) 25%, transparent) 31px),
        repeating-radial-gradient(circle at 70% 70%, transparent 0, transparent 30px, color-mix(in srgb, var(--az-ocean-200) 20%, transparent) 30px, color-mix(in srgb, var(--az-ocean-200) 20%, transparent) 31px)`,
    },
  },
  mesh: {
    name: "Mesh",
    style: {
      background: `
        radial-gradient(at 0% 0%, color-mix(in srgb, var(--az-ocean-200) 50%, transparent) 0px, transparent 50%),
        radial-gradient(at 100% 0%, color-mix(in srgb, var(--az-lava-200) 40%, transparent) 0px, transparent 50%),
        radial-gradient(at 100% 100%, color-mix(in srgb, var(--az-ocean-300) 30%, transparent) 0px, transparent 50%),
        radial-gradient(at 0% 100%, color-mix(in srgb, var(--az-amber-400) 20%, transparent) 0px, transparent 50%),
        var(--az-bg)`,
    },
  },
  blueprint: {
    name: "Blueprint",
    style: {
      backgroundColor: "var(--az-ocean-700)",
      color: "var(--az-bg)",
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 32px 32px,
        linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px) 0 0 / 32px 32px,
        linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px) 0 0 / 160px 160px,
        linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px) 0 0 / 160px 160px`,
    },
  },
  basalt: {
    name: "Basalt",
    style: {
      backgroundColor: "#0B0E12",
      color: "#F0F1F3",
      backgroundImage: `
        radial-gradient(ellipse 600px 300px at 30% 20%, rgba(74,155,199,0.12), transparent 70%),
        radial-gradient(ellipse 500px 250px at 80% 80%, rgba(224,123,83,0.1), transparent 70%),
        repeating-linear-gradient(135deg, transparent 0, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px)`,
    },
  },
  contours: {
    name: "Contours",
    style: {
      backgroundColor: "var(--az-bg-2)",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><g fill='none' stroke='%23C8DCE8' stroke-width='1' opacity='0.6'><path d='M50 300 Q 200 200 350 280 T 600 250'/><path d='M50 350 Q 200 250 350 330 T 600 300'/><path d='M50 400 Q 200 300 350 380 T 600 350'/><path d='M50 250 Q 200 150 350 230 T 600 200'/><path d='M50 200 Q 200 100 350 180 T 600 150'/><path d='M50 450 Q 200 350 350 430 T 600 400'/></g></svg>")`,
      backgroundSize: "600px 600px",
    },
  },
};

/* ------------- Widget catalog ------------- */
const WIDGET_CATALOG = [
  { id: "kpi",       title: "KPI",          icon: "target",   desc: "Single big number", w: 3, h: 1 },
  { id: "weather",   title: "Weather",      icon: "cloud",    desc: "Live forecast", w: 4, h: 2 },
  { id: "tasks",     title: "Tasks",        icon: "check",    desc: "Drag-reorder list", w: 4, h: 2 },
  { id: "news",      title: "News feed",    icon: "inbox",    desc: "Latest from org", w: 5, h: 2 },
  { id: "calendar",  title: "Calendar",     icon: "calendar", desc: "Today's agenda", w: 4, h: 2 },
  { id: "stocks",    title: "Markets",      icon: "chart",    desc: "Tickers & sparkline", w: 4, h: 2 },
  { id: "team",      title: "Team",         icon: "user",     desc: "Who's online", w: 4, h: 1 },
  { id: "activity",  title: "Activity",     icon: "activity", desc: "Recent events", w: 4, h: 2 },
  { id: "links",     title: "Quick links",  icon: "bookmark", desc: "Pinned URLs", w: 3, h: 2 },
  { id: "clock",     title: "World clock",  icon: "clock",    desc: "Timezones", w: 3, h: 1 },
  { id: "notes",     title: "Notes",        icon: "edit",     desc: "Quick scratchpad", w: 4, h: 2 },
  { id: "chart",     title: "Chart",        icon: "bar",      desc: "Bar chart", w: 5, h: 2 },
];

/* ------------- Renderers ------------- */
function W_KPI({ data = { label: "Active users", value: "12,847", delta: "+12.4%", dir: "up" } }) {
  return (
    <div>
      <div className="az-stat-label">{data.label}</div>
      <div className="az-stat-num" style={{ marginTop: 6 }}>{data.value}</div>
      <div className={`az-stat-delta az-stat-delta--${data.dir}`} style={{ marginTop: 4 }}>
        <Icon name={data.dir === "up" ? "arrowup" : "arrowdown"} size={11} />{data.delta}
      </div>
    </div>
  );
}

function W_Weather() {
  const days = [["Today", "sunny", 24, 16], ["Wed", "cloud", 22, 15], ["Thu", "rain", 19, 14], ["Fri", "cloud", 21, 14], ["Sat", "sunny", 25, 17]];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
        <Icon name="sunny" size={42} style={{ color: "var(--az-amber-400)" }} />
        <div>
          <div style={{ fontFamily: "var(--az-font-display)", fontSize: 32, fontWeight: 500, lineHeight: 1 }}>24°</div>
          <div style={{ fontSize: 12, color: "var(--az-text-3)" }}>Ponta Delgada · Clear</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginTop: "auto" }}>
        {days.map(([d, ic, hi, lo]) => (
          <div key={d} style={{ textAlign: "center", padding: "6px 4px", borderRadius: 6, background: "var(--az-bg-2)", fontSize: 11 }}>
            <div style={{ color: "var(--az-text-3)" }}>{d}</div>
            <Icon name={ic} size={16} style={{ margin: "4px auto", display: "block", color: ic === "sunny" ? "var(--az-amber-400)" : ic === "rain" ? "var(--az-ocean-400)" : "var(--az-text-3)" }} />
            <div className="az-text-mono">{hi}° <span style={{ color: "var(--az-text-3)" }}>{lo}°</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_Tasks() {
  const [items, setItems] = uS([
    { id: 1, t: "Review PR #284 — auth flow", done: true },
    { id: 2, t: "Q2 OKRs draft", done: false },
    { id: 3, t: "1:1 with Sara", done: false },
    { id: 4, t: "Ship pricing v2", done: false },
  ]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map(i => (
        <label key={i.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
          <input type="checkbox" checked={i.done} onChange={() => setItems(items.map(x => x.id === i.id ? { ...x, done: !x.done } : x))} className="az-check" />
          <span style={{ flex: 1, textDecoration: i.done ? "line-through" : "none", color: i.done ? "var(--az-text-3)" : "var(--az-text)" }}>{i.t}</span>
        </label>
      ))}
      <button className="az-btn az-btn--ghost az-btn--sm" style={{ justifyContent: "flex-start", marginTop: 4 }}>
        <Icon name="plus" size={12} />Add task
      </button>
    </div>
  );
}

function W_News() {
  const items = [
    ["Azores Cloud raises Series B", "TechCrunch", "12m"],
    ["Ocean v3 region now GA in Lisbon", "Internal", "1h"],
    ["Q1 retro: top 5 takeaways", "Notion", "3h"],
    ["New design system rolling out", "Internal", "yesterday"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map(([title, src, time], i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: i < 3 ? "1px solid var(--az-line)" : "none" }}>
          <div style={{ width: 4, alignSelf: "stretch", borderRadius: 999, background: i === 0 ? "var(--az-lava-400)" : "var(--az-line-2)" }}></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{title}</div>
            <div style={{ fontSize: 11, color: "var(--az-text-3)", marginTop: 2 }}>{src} · {time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function W_Calendar() {
  const events = [
    ["09:00", "Standup", "ocean"],
    ["10:30", "Design review", "lava"],
    ["13:00", "Lunch w/ João", "moss"],
    ["15:00", "All hands", "amber"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 12, color: "var(--az-text-3)", marginBottom: 4 }}>Tuesday, April 30</div>
      {events.map(([t, name, c], i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 8px", background: "var(--az-bg-2)", borderRadius: 6, borderLeft: `3px solid var(--az-${c}-400)` }}>
          <span className="az-text-mono" style={{ fontSize: 11, color: "var(--az-text-3)", width: 40 }}>{t}</span>
          <span style={{ fontSize: 13, flex: 1 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function W_Stocks() {
  const tickers = [["NVDA", 882.4, +2.1, "up"], ["AAPL", 174.2, -0.8, "dn"], ["MSFT", 421.5, +0.4, "up"], ["EUR/USD", 1.072, +0.12, "up"]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {tickers.map(([sym, val, d, dir]) => (
        <div key={sym} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 4px", fontSize: 13 }}>
          <span className="az-text-mono az-text-strong" style={{ width: 70 }}>{sym}</span>
          <MiniSpark up={dir === "up"} />
          <span className="az-text-mono" style={{ marginLeft: "auto" }}>{val}</span>
          <span className={`az-stat-delta az-stat-delta--${dir}`} style={{ width: 56, justifyContent: "flex-end" }}>{d > 0 ? "+" : ""}{d}%</span>
        </div>
      ))}
    </div>
  );
}

function MiniSpark({ up }) {
  const pts = up ? [10, 8, 12, 9, 14, 11, 16] : [16, 14, 11, 13, 10, 12, 8];
  const w = 60, h = 18;
  const xs = pts.map((_, i) => (i * w) / (pts.length - 1));
  const ys = pts.map(v => h - (v / 18) * h);
  const d = xs.map((x, i) => `${i ? "L" : "M"} ${x} ${ys[i]}`).join(" ");
  return <svg width={w} height={h}><path d={d} fill="none" stroke={up ? "var(--az-moss-500)" : "var(--az-coral-500)"} strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

function W_Team() {
  const team = [["CR", "ocean", true], ["JM", "lava", true], ["SP", "moss", false], ["AT", "amber", true], ["MK", "coral", false]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 12, color: "var(--az-text-3)" }}>3 of 5 online</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {team.map(([init, c, on], i) => (
          <div key={i} style={{ position: "relative" }}>
            <span className="az-avatar" style={{ background: `var(--az-${c}-400)`, opacity: on ? 1 : 0.4 }}>{init}</span>
            <span style={{ position: "absolute", bottom: 0, right: 0, width: 9, height: 9, borderRadius: 999, background: on ? "var(--az-moss-500)" : "var(--az-line-2)", border: "2px solid var(--az-surface)" }}></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function W_Activity() {
  const a = [
    ["Sara", "merged PR #284", "8m", "git"],
    ["João", "deployed billing-api", "22m", "activity"],
    ["You", "starred azores/ui-kit", "1h", "star"],
    ["Tomás", "commented on issue #91", "2h", "edit"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {a.map(([who, what, when, ic], i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13 }}>
          <Icon name={ic} size={14} style={{ color: "var(--az-text-3)", marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontWeight: 500 }}>{who}</strong> <span style={{ color: "var(--az-text-2)" }}>{what}</span>
            <div style={{ fontSize: 11, color: "var(--az-text-3)" }}>{when}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function W_Links() {
  const links = [["Docs", "doc"], ["GitHub", "git"], ["Figma", "image"], ["Linear", "list"], ["Slack", "inbox"]];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
      {links.map(([n, ic]) => (
        <button key={n} className="az-btn" style={{ justifyContent: "flex-start", height: 32, fontSize: 12 }}>
          <Icon name={ic === "doc" ? "file" : ic === "git" ? "git" : ic === "image" ? "image" : ic === "list" ? "list" : "inbox"} size={12} />{n}
        </button>
      ))}
    </div>
  );
}

function W_Clock() {
  const zones = [["Lisbon", "14:32"], ["New York", "09:32"], ["Tokyo", "22:32"]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {zones.map(([n, t], i) => (
        <div key={n} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
          <span style={{ color: "var(--az-text-2)" }}>{n}</span>
          <span className="az-text-mono az-text-strong">{t}</span>
        </div>
      ))}
    </div>
  );
}

function W_Notes() {
  return (
    <textarea className="az-textarea" defaultValue="Q2 priorities:&#10;1. Ship pricing v2&#10;2. Hire 2 engineers&#10;3. SOC 2 type II"
      style={{ height: "100%", minHeight: 0, border: "none", padding: 0, background: "transparent", fontSize: 13, lineHeight: 1.6, resize: "none" }} />
  );
}

function W_Chart() {
  const bars = [62, 48, 75, 88, 70, 92, 78, 84];
  const max = Math.max(...bars);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--az-text-3)", marginBottom: 8 }}>
        <span>Weekly throughput</span><span className="az-text-mono">+18%</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, minHeight: 80 }}>
        {bars.map((v, i) => (
          <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, background: i === bars.length - 1 ? "var(--az-lava-400)" : "var(--az-ocean-400)", borderRadius: "3px 3px 0 0" }}></div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, fontSize: 10, color: "var(--az-text-3)", marginTop: 4, fontFamily: "var(--az-font-mono)" }}>
        {["M","T","W","T","F","S","S","M"].map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center" }}>{d}</div>)}
      </div>
    </div>
  );
}

const RENDERERS = { kpi: W_KPI, weather: W_Weather, tasks: W_Tasks, news: W_News, calendar: W_Calendar, stocks: W_Stocks, team: W_Team, activity: W_Activity, links: W_Links, clock: W_Clock, notes: W_Notes, chart: W_Chart };

/* ------------- Grid packing ------------- */
const COLS = 12;
const ROWS_MAX = 30;

// Sizes the cycler offers. Order matters — clicking "size" cycles through.
const SIZE_PRESETS = [
  { key: "S",  w: 3, h: 1, label: "Small" },
  { key: "M",  w: 4, h: 2, label: "Medium" },
  { key: "L",  w: 6, h: 2, label: "Large" },
  { key: "XL", w: 8, h: 3, label: "Extra-large" },
];
const sizeKey = (w, h) => {
  const m = SIZE_PRESETS.find(s => s.w === w && s.h === h);
  return m ? m.key : `${w}×${h}`;
};
const nextSize = (w, h) => {
  const i = SIZE_PRESETS.findIndex(s => s.w === w && s.h === h);
  return SIZE_PRESETS[(i + 1) % SIZE_PRESETS.length];
};

// Pack a list of widgets into a grid, mutating each with col/row.
// Walks left→right, top→bottom and places each at first cell where its bbox fits.
function packWidgets(items) {
  const occ = []; // boolean[ROWS][COLS]
  const ensureRow = (r) => { while (occ.length <= r) occ.push(new Array(COLS).fill(false)); };
  const fits = (r, c, w, h) => {
    if (c + w > COLS) return false;
    for (let dr = 0; dr < h; dr++) {
      ensureRow(r + dr);
      for (let dc = 0; dc < w; dc++) if (occ[r + dr][c + dc]) return false;
    }
    return true;
  };
  const mark = (r, c, w, h) => {
    for (let dr = 0; dr < h; dr++) {
      ensureRow(r + dr);
      for (let dc = 0; dc < w; dc++) occ[r + dr][c + dc] = true;
    }
  };
  const out = [];
  for (const it of items) {
    const w = Math.min(it.w, COLS);
    const h = it.h;
    let placed = false;
    for (let r = 0; r < ROWS_MAX && !placed; r++) {
      for (let c = 0; c <= COLS - w && !placed; c++) {
        if (fits(r, c, w, h)) { mark(r, c, w, h); out.push({ ...it, col: c, row: r, w, h }); placed = true; }
      }
    }
    if (!placed) out.push({ ...it, col: 0, row: occ.length, w, h });
  }
  return out;
}

// Re-order list so that `dragId` is moved to a slot whose nearest existing widget
// is the one currently under the cursor. The packing then handles flow.
function reorderForInsertion(items, dragId, targetCol, targetRow, ghostW, ghostH) {
  const without = items.filter(w => w.id !== dragId);
  const dragged = items.find(w => w.id === dragId);
  if (!dragged) return items;
  const ghost = { ...dragged, w: ghostW || dragged.w, h: ghostH || dragged.h };
  // Compute a "score" for each existing widget = how close its current packed position is to the target.
  // Insert dragged before the first widget that is at-or-after the target slot in reading order.
  const packed = packWidgets(without);
  const targetKey = targetRow * COLS + targetCol;
  let insertIdx = packed.length;
  for (let i = 0; i < packed.length; i++) {
    const k = packed[i].row * COLS + packed[i].col;
    if (k >= targetKey) { insertIdx = i; break; }
  }
  const next = [...without];
  next.splice(insertIdx, 0, ghost);
  return next;
}

/* ------------- Dashboard ------------- */

// Tiny SVG glyph that visualizes the current widget size as a 4-cell badge with
// the current footprint highlighted. Looks much nicer than a generic "resize" icon.
function SizeGlyph({ w, h }) {
  // Map any size to a 4×3 mini-grid representation.
  const cols = 4, rows = 3;
  const fillW = Math.max(1, Math.min(cols, Math.round((w / 12) * cols + 0.0001)));
  const fillH = Math.max(1, Math.min(rows, Math.min(h, rows)));
  const cellSize = 3, gap = 1;
  const totalW = cols * cellSize + (cols - 1) * gap;
  const totalH = rows * cellSize + (rows - 1) * gap;
  return (
    <svg width="14" height="14" viewBox={`0 0 ${totalW} ${totalH}`}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const filled = r < fillH && c < fillW;
          return (
            <rect key={`${r}-${c}`}
              x={c * (cellSize + gap)} y={r * (cellSize + gap)}
              width={cellSize} height={cellSize} rx="0.5"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="0.5" opacity={filled ? 1 : 0.35} />
          );
        })
      )}
    </svg>
  );
}
function UXDashboard() {
  const [bg, setBg] = uS("grid");
  const [widgets, setWidgets] = uS([
    { id: "w1", type: "kpi", w: 3, h: 1, data: { label: "MRR", value: "$284K", delta: "+12.4%", dir: "up" } },
    { id: "w2", type: "kpi", w: 3, h: 1, data: { label: "Active users", value: "12.8K", delta: "+8.1%", dir: "up" } },
    { id: "w3", type: "kpi", w: 3, h: 1, data: { label: "Churn", value: "1.2%", delta: "+0.1%", dir: "dn" } },
    { id: "w4", type: "kpi", w: 3, h: 1, data: { label: "NPS", value: "62", delta: "+4", dir: "up" } },
    { id: "w5", type: "chart", w: 6, h: 2 },
    { id: "w6", type: "weather", w: 3, h: 2 },
    { id: "w7", type: "tasks", w: 3, h: 2 },
    { id: "w8", type: "calendar", w: 4, h: 2 },
    { id: "w9", type: "activity", w: 4, h: 2 },
    { id: "w10", type: "stocks", w: 4, h: 2 },
  ]);
  const [dragState, setDragState] = uS(null); // { id, fromLibType, w, h, ghost: {col,row} }
  const [libOpen, setLib] = uS(false);
  const [resizingId, setResizingId] = uS(null);
  const gridRef = uR(null);

  // Compute live layout — preview when dragging, otherwise straight pack.
  const layout = uM(() => {
    if (dragState && dragState.ghost) {
      let list = widgets;
      if (dragState.fromLibType) {
        // Insert a virtual widget for preview
        const tpl = WIDGET_CATALOG.find(c => c.id === dragState.fromLibType);
        if (tpl) {
          const ghost = { id: "__ghost__", type: tpl.id, w: dragState.w, h: dragState.h, __ghost: true };
          list = reorderForInsertion([...widgets, ghost], "__ghost__", dragState.ghost.col, dragState.ghost.row, dragState.w, dragState.h);
        }
      } else if (dragState.id) {
        list = reorderForInsertion(widgets, dragState.id, dragState.ghost.col, dragState.ghost.row, dragState.w, dragState.h);
      }
      return packWidgets(list);
    }
    return packWidgets(widgets);
  }, [widgets, dragState]);

  const cellFromEvent = (e) => {
    const grid = gridRef.current;
    if (!grid) return null;
    const rect = grid.getBoundingClientRect();
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap) || 0;
    const rowH = parseFloat(styles.gridAutoRows) || 92;
    const colW = (rect.width - gap * (COLS - 1)) / COLS;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const col = Math.max(0, Math.min(COLS - 1, Math.round(x / (colW + gap))));
    const row = Math.max(0, Math.floor(y / (rowH + gap)));
    return { col, row, colW, rowH, gap, rect };
  };

  const onDragStartWidget = (id) => (e) => {
    const w = widgets.find(x => x.id === id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    setDragState({ id, w: w.w, h: w.h, ghost: null });
  };
  const onDragOverGrid = (e) => {
    e.preventDefault();
    const cell = cellFromEvent(e);
    if (!cell) return;
    setDragState(prev => {
      if (!prev) return prev;
      if (prev.ghost && prev.ghost.col === cell.col && prev.ghost.row === cell.row) return prev;
      return { ...prev, ghost: { col: cell.col, row: cell.row } };
    });
  };
  const onDropGrid = (e) => {
    e.preventDefault();
    const cell = cellFromEvent(e);
    if (!cell) return;
    const fromLib = e.dataTransfer.getData("application/x-az-widget");
    if (fromLib) {
      const tpl = WIDGET_CATALOG.find(c => c.id === fromLib);
      if (tpl) {
        const newW = { id: `w${Date.now()}`, type: tpl.id, w: tpl.w, h: tpl.h };
        const list = reorderForInsertion([...widgets, newW], newW.id, cell.col, cell.row, tpl.w, tpl.h);
        setWidgets(list);
      }
    } else if (dragState?.id) {
      const list = reorderForInsertion(widgets, dragState.id, cell.col, cell.row, dragState.w, dragState.h);
      setWidgets(list);
    }
    setDragState(null);
  };
  const onDragEnd = () => setDragState(null);

  // Library drag tracking — set ghost position even though we don't have an id
  const onLibDragStart = (type) => (e) => {
    const tpl = WIDGET_CATALOG.find(c => c.id === type);
    e.dataTransfer.setData("application/x-az-widget", type);
    e.dataTransfer.effectAllowed = "copy";
    setDragState({ id: null, fromLibType: type, w: tpl.w, h: tpl.h, ghost: null });
  };
  const onLibDragEnd = () => setDragState(null);

  const removeWidget = (id) => setWidgets(widgets.filter(w => w.id !== id));
  const cycleSize = (id) => setWidgets(widgets.map(w => {
    if (w.id !== id) return w;
    const next = nextSize(w.w, w.h);
    return { ...w, w: next.w, h: next.h };
  }));

  // Resize via mouse drag
  const startResize = (id) => (e) => {
    e.preventDefault(); e.stopPropagation();
    setResizingId(id);
    const startX = e.clientX, startY = e.clientY;
    const widget = widgets.find(w => w.id === id);
    const startW = widget.w, startH = widget.h;
    const grid = gridRef.current;
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap) || 0;
    const rowH = parseFloat(styles.gridAutoRows) || 92;
    const colW = (grid.getBoundingClientRect().width - gap * (COLS - 1)) / COLS;
    const onMove = (ev) => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      const newW = Math.max(2, Math.min(COLS, Math.round(startW + dx / (colW + gap))));
      const newH = Math.max(1, Math.min(6, Math.round(startH + dy / (rowH + gap))));
      setWidgets(prev => prev.map(w => w.id === id ? { ...w, w: newW, h: newH } : w));
    };
    const onUp = () => { setResizingId(null); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
  };

  // FLIP-style fluid reflow: capture positions before layout change, then apply
  // a transient transform that animates back to the new position.
  const positionsRef = uR(new Map());
  uLE(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const els = grid.querySelectorAll("[data-wid]");
    const next = new Map();
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      const id = el.getAttribute("data-wid");
      next.set(id, { x: r.left, y: r.top, w: r.width, h: r.height });
      const prev = positionsRef.current.get(id);
      if (prev) {
        const dx = prev.x - r.left;
        const dy = prev.y - r.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          el.style.transition = "none";
          el.style.transform = `translate(${dx}px, ${dy}px)`;
          // Force reflow then animate to identity
          void el.offsetWidth;
          el.style.transition = "transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1)";
          el.style.transform = "";
        }
      }
    });
    positionsRef.current = next;
  });

  const bgConfig = BACKGROUNDS[bg];
  const isDark = bg === "blueprint" || bg === "basalt";

  return (
    <div style={{ ...bgConfig.style, minHeight: "100vh", color: isDark ? "#F0F1F3" : undefined }}>
      <div className="az-content az-content--full" style={{ padding: "32px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div className="az-page-eyebrow">AZORES UX</div>
            <h1 className="az-page-title" style={{ marginBottom: 6, color: isDark ? "#F0F1F3" : undefined }}>Good morning, Catarina.</h1>
            <p style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--az-text-2)", margin: 0, fontSize: 15 }}>
              Drag widgets onto any cell — others reflow live. Click the size glyph in any header to cycle sizes.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 4, padding: 4, background: isDark ? "rgba(255,255,255,0.08)" : "var(--az-surface)", border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "var(--az-line)"}`, borderRadius: 10 }}>
              {Object.entries(BACKGROUNDS).map(([key, b]) => (
                <button key={key} onClick={() => setBg(key)}
                  title={b.name}
                  style={{ width: 28, height: 28, border: bg === key ? "2px solid var(--az-primary)" : `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "var(--az-line)"}`, borderRadius: 6, cursor: "pointer", padding: 0,
                    ...(b.style || {}), backgroundSize: key === "grid" || key === "dot" ? "8px 8px" : key === "contours" ? "60px 60px" : "auto" }} />
              ))}
            </div>
            <button className="az-btn az-btn--primary" onClick={() => setLib(true)}><Icon name="plus" size={14} />Add widget</button>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef}
          className={`az-grid ${dragState ? "is-dragging" : ""}`}
          onDragOver={onDragOverGrid}
          onDrop={onDropGrid}
        >
          {/* Background cells revealed during drag */}
          <div className="az-grid-bg" aria-hidden="true">
            {Array.from({ length: COLS * 6 }).map((_, i) => <div key={i} className="az-grid-cell"></div>)}
          </div>

          {layout.map(w => {
            if (w.__ghost) {
              return (
                <div key="ghost" className="az-grid-ghost"
                  style={{
                    gridColumn: `${w.col + 1} / span ${w.w}`,
                    gridRow: `${w.row + 1} / span ${w.h}`,
                    position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--az-primary)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em",
                  }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="plus" size={14} />DROP HERE
                  </span>
                </div>
              );
            }
            const Renderer = RENDERERS[w.type];
            const def = WIDGET_CATALOG.find(c => c.id === w.type);
            const isDragging = dragState?.id === w.id;
            const sk = sizeKey(w.w, w.h);
            return (
              <div key={w.id}
                data-wid={w.id}
                className={`az-widget ${isDragging ? "is-dragging" : ""}`}
                style={{
                  gridColumn: `${w.col + 1} / span ${w.w}`,
                  gridRow: `${w.row + 1} / span ${w.h}`,
                  background: isDark ? "rgba(255,255,255,0.06)" : "var(--az-surface)",
                  borderColor: isDark ? "rgba(255,255,255,0.12)" : "var(--az-line)",
                  color: isDark ? "#F0F1F3" : undefined,
                  backdropFilter: isDark ? "blur(10px)" : undefined,
                  zIndex: 1,
                }}
                draggable
                onDragStart={onDragStartWidget(w.id)}
                onDragEnd={onDragEnd}
              >
                <div className="az-widget-head" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "var(--az-line)" }}>
                  <span className="az-widget-handle"><Icon name="drag" size={12} /></span>
                  <span className="az-widget-title" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--az-text-2)" }}>{def?.title || w.type}</span>
                  <div className="az-widget-actions">
                    <button className="az-widget-action az-widget-size" title={`Size: ${sk} — click to cycle`} onClick={() => cycleSize(w.id)}>
                      <SizeGlyph w={w.w} h={w.h} />
                    </button>
                    <button className="az-widget-action" title="Refresh"><Icon name="refresh" size={12} /></button>
                    <button className="az-widget-action" title="More"><Icon name="morev" size={12} /></button>
                    <button className="az-widget-action" title="Remove" onClick={() => removeWidget(w.id)}><Icon name="x" size={12} /></button>
                  </div>
                </div>
                <div className="az-widget-body">
                  {Renderer ? <Renderer data={w.data} /> : null}
                </div>
                <div className="az-widget-resize" onMouseDown={startResize(w.id)}></div>
                {resizingId === w.id && (
                  <div style={{ position: "absolute", bottom: 4, left: 8, fontSize: 10, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)", background: "var(--az-surface)", padding: "1px 6px", borderRadius: 4, border: "1px solid var(--az-line)" }}>{w.w}×{w.h}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget library drawer */}
      <div className={`az-widget-library ${libOpen ? "is-open" : ""}`}>
        <div className="az-widget-library-header">
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Widget library</div>
            <div style={{ fontSize: 12, color: "var(--az-text-3)" }}>Drag onto the dashboard, or click to add</div>
          </div>
          <button className="az-btn az-btn--ghost az-btn--icon az-btn--sm" onClick={() => setLib(false)}><Icon name="x" /></button>
        </div>
        <div className="az-widget-library-body">
          {WIDGET_CATALOG.map(c => (
            <div key={c.id} className="az-widget-card"
              draggable
              onDragStart={onLibDragStart(c.id)}
              onDragEnd={onLibDragEnd}
              onClick={() => {
                setWidgets([...widgets, { id: `w${Date.now()}`, type: c.id, w: c.w, h: c.h }]);
              }}
            >
              <div className="az-widget-card-icon"><Icon name={c.icon} size={18} /></div>
              <div style={{ flex: 1 }}>
                <div className="az-widget-card-title">{c.title}</div>
                <div className="az-widget-card-desc">{c.desc}</div>
              </div>
              <Icon name="plus" size={14} style={{ color: "var(--az-text-3)" }} />
            </div>
          ))}
        </div>
      </div>
      {libOpen && <div onClick={() => setLib(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.2)", zIndex: 800 }}></div>}
    </div>
  );
}

window.UXDashboard = UXDashboard;
