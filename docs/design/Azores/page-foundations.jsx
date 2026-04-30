// Azores — Foundations & Components pages
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ==================== FOUNDATIONS ==================== */

const COLOR_GROUPS = [
  {
    name: "Ocean (primary)",
    tokens: [
      ["--az-ocean-50", "#EAF2F7"], ["--az-ocean-100", "#C8DCE8"],
      ["--az-ocean-200", "#95B9CF"], ["--az-ocean-300", "#5E91B0"],
      ["--az-ocean-400", "#2F6F94"], ["--az-ocean-500", "#0F4C75"],
      ["--az-ocean-600", "#093A5C"], ["--az-ocean-700", "#062A45"],
      ["--az-ocean-800", "#041C2E"],
    ],
  },
  {
    name: "Lava (accent)",
    tokens: [
      ["--az-lava-50", "#FBEFE9"], ["--az-lava-100", "#F6D7C5"],
      ["--az-lava-200", "#ECA88A"], ["--az-lava-300", "#E07B53"],
      ["--az-lava-400", "#D5582A"], ["--az-lava-500", "#B84417"],
      ["--az-lava-600", "#8E3210"],
    ],
  },
  {
    name: "Status",
    tokens: [
      ["--az-moss-500 (success)", "#2F6E42"],
      ["--az-amber-500 (warning)", "#B58324"],
      ["--az-coral-500 (danger)", "#A82F2F"],
    ],
  },
  {
    name: "Neutrals (light)",
    tokens: [
      ["--az-bg", "#FAFAF7"], ["--az-bg-2", "#F2F2EE"],
      ["--az-surface", "#FFFFFF"], ["--az-line", "#E2E2DA"],
      ["--az-text-3", "#7A7E87"], ["--az-text-2", "#4A4E57"],
      ["--az-text", "#14161A"],
    ],
  },
];

const TYPE_SCALE = [
  ["Display", "48px", "var(--az-font-display)", 500, "Atlantic precision"],
  ["Title 1", "38px", "var(--az-font-display)", 500, "Component patterns"],
  ["Title 2", "30px", "var(--az-font-display)", 500, "Section heading"],
  ["Heading",  "20px", "var(--az-font-sans)", 600, "Card heading"],
  ["Body",     "15px", "var(--az-font-sans)", 400, "Standard paragraph used throughout the system."],
  ["Body sm",  "13px", "var(--az-font-sans)", 400, "Secondary or dense interface copy."],
  ["Mono",     "13px", "var(--az-font-mono)", 400, "0.32 — 0F4C75 — useState()"],
  ["Caption",  "12px", "var(--az-font-sans)", 500, "ALL CAPS LABEL"],
];

function Foundations() {
  return (
    <div className="az-content">
      <div className="az-page-eyebrow">FOUNDATIONS</div>
      <h1 className="az-page-title">Building blocks for Atlantic-grade interfaces.</h1>
      <p className="az-page-lead">
        Azores is a modern corporate design system built around volcanic basalt,
        Atlantic ocean, and warm lava. Tokens, type, and components compose into
        clear, dense, professional product surfaces.
      </p>

      {/* Colors */}
      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Color</h2>
          <span className="az-section-sub">CSS variables • Light + Dark</span>
        </div>
        {COLOR_GROUPS.map(group => (
          <div key={group.name} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "var(--az-text-3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>{group.name}</div>
            <div className="az-tokens-grid">
              {group.tokens.map(([name, val]) => (
                <div key={name} className="az-token">
                  <div className="az-token-swatch" style={{ background: val }}></div>
                  <div className="az-token-meta">
                    <div className="az-token-name">{name}</div>
                    <div className="az-token-val">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Typography */}
      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Typography</h2>
          <span className="az-section-sub">Geist • Fraunces • JetBrains Mono</span>
        </div>
        <div className="az-card">
          <div style={{ padding: "0 24px" }}>
            {TYPE_SCALE.map(([label, size, family, weight, sample]) => (
              <div key={label} className="az-type-row">
                <div className="az-type-label">{label}</div>
                <div style={{ fontFamily: family, fontSize: size, fontWeight: weight, lineHeight: 1.25 }}>{sample}</div>
                <div className="az-type-meta">{size} · {weight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Spacing & Radii</h2>
          <span className="az-section-sub">4px base scale</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="az-card">
            <div className="az-card-header"><h3 className="az-card-title">Spacing</h3></div>
            <div className="az-card-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["s-1", 4],["s-2", 8],["s-3", 12],["s-4", 16],["s-5", 20],["s-6", 24],["s-8", 32],["s-10", 40],["s-12", 48]].map(([n, v]) => (
                <div key={n} style={{ display: "grid", gridTemplateColumns: "60px 1fr 60px", alignItems: "center", gap: 12 }}>
                  <span className="az-text-mono" style={{ fontSize: 12, color: "var(--az-text-3)" }}>{n}</span>
                  <div style={{ height: 8, width: v * 4, background: "var(--az-ocean-300)", borderRadius: 4 }}></div>
                  <span className="az-text-mono" style={{ fontSize: 12, color: "var(--az-text-3)" }}>{v}px</span>
                </div>
              ))}
            </div>
          </div>
          <div className="az-card">
            <div className="az-card-header"><h3 className="az-card-title">Radii</h3></div>
            <div className="az-card-body" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[["xs", 4],["sm", 6],["md", 10],["lg", 14],["xl", 20],["pill", 999]].map(([n, v]) => (
                <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 56, height: 56, background: "var(--az-bg-2)", border: "1px solid var(--az-line)", borderRadius: v }}></div>
                  <span className="az-text-mono" style={{ fontSize: 11, color: "var(--az-text-3)" }}>{n} · {v}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Elevation</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {["xs", "sm", "md", "lg", "xl"].map(s => (
            <div key={s} style={{ background: "var(--az-surface)", borderRadius: 14, height: 100, boxShadow: `var(--az-shadow-${s})`, border: "1px solid var(--az-line)", display: "grid", placeItems: "center", fontFamily: "var(--az-font-mono)", fontSize: 12, color: "var(--az-text-3)" }}>
              shadow-{s}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

window.Foundations = Foundations;
