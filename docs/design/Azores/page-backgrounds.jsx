// Azores — Backgrounds & Icon library showcase
const { useState: uSb, useMemo: uMb } = React;

/* ========== SOPHISTICATED AZORES BACKGROUNDS ==========
   Each background has light + dark variants. Pure CSS, no images. */

const BG_LIB = [
  {
    id: "caldera",
    name: "Caldera",
    desc: "Volcanic crater — concentric calm",
    light: {
      background: `
        radial-gradient(ellipse 100% 80% at 50% 50%, rgba(15, 76, 117, 0.10) 0%, transparent 55%),
        radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15, 76, 117, 0.14) 0%, transparent 55%),
        radial-gradient(ellipse 45% 40% at 50% 50%, rgba(213, 88, 42, 0.10) 0%, transparent 60%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(15, 76, 117, 0.06) 60px, rgba(15, 76, 117, 0.06) 61px),
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 100% 80% at 50% 50%, rgba(74, 155, 199, 0.12) 0%, transparent 55%),
        radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74, 155, 199, 0.10) 0%, transparent 55%),
        radial-gradient(ellipse 45% 40% at 50% 50%, rgba(224, 123, 83, 0.14) 0%, transparent 60%),
        repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 60px, rgba(74, 155, 199, 0.05) 60px, rgba(74, 155, 199, 0.05) 61px),
        #0B0E12`,
    },
  },
  {
    id: "atlantic",
    name: "Atlantic",
    desc: "Layered ocean swells",
    light: {
      background: `
        linear-gradient(180deg, rgba(245, 248, 251, 1) 0%, rgba(220, 235, 244, 1) 100%),
        radial-gradient(ellipse 1200px 200px at 30% 30%, rgba(15, 76, 117, 0.08), transparent 70%),
        radial-gradient(ellipse 800px 150px at 70% 70%, rgba(15, 76, 117, 0.06), transparent 70%)`,
    },
    dark: {
      background: `
        linear-gradient(180deg, #0B1620 0%, #0F2230 100%),
        radial-gradient(ellipse 1200px 300px at 30% 30%, rgba(74, 155, 199, 0.10), transparent 70%),
        radial-gradient(ellipse 800px 200px at 70% 70%, rgba(74, 155, 199, 0.08), transparent 70%)`,
    },
  },
  {
    id: "basalt",
    name: "Basalt",
    desc: "Hexagonal volcanic rock",
    light: {
      background: `
        conic-gradient(from 30deg at 50% 50%, #F0EFEA, #F5F4EF, #F0EFEA, #F5F4EF, #F0EFEA, #F5F4EF, #F0EFEA),
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'><polygon points='20,0 60,0 80,34.6 60,69.3 20,69.3 0,34.6' fill='none' stroke='%23D8D6CD' stroke-width='1'/><polygon points='60,0 100,0 120,34.6 100,69.3 60,69.3 40,34.6' fill='none' stroke='%23D8D6CD' stroke-width='1' transform='translate(-40 46)'/></svg>")`,
      backgroundSize: "auto, 80px 92px",
    },
    dark: {
      background: `
        linear-gradient(180deg, #14161A 0%, #1B1E24 100%),
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'><polygon points='20,0 60,0 80,34.6 60,69.3 20,69.3 0,34.6' fill='none' stroke='%23262A32' stroke-width='1'/><polygon points='60,0 100,0 120,34.6 100,69.3 60,69.3 40,34.6' fill='none' stroke='%23262A32' stroke-width='1' transform='translate(-40 46)'/></svg>")`,
      backgroundSize: "auto, 80px 92px",
    },
  },
  {
    id: "horizon",
    name: "Horizon",
    desc: "Ocean meets sky",
    light: {
      background: `
        linear-gradient(180deg,
          #FBF5EE 0%,
          #F5E8D6 28%,
          #E5D2B6 42%,
          #D4DDDF 50%,
          #B8CDD8 58%,
          #8FB1C4 75%,
          #4A7FA0 100%)`,
    },
    dark: {
      background: `
        linear-gradient(180deg,
          #1A1612 0%,
          #2A1F1A 25%,
          #3A2920 40%,
          #1F2A35 55%,
          #14222F 75%,
          #0B1620 100%)`,
    },
  },
  {
    id: "topo",
    name: "Topographic",
    desc: "Island contour lines",
    light: {
      background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><g fill='none' stroke='%23BFD3E1' stroke-width='1' opacity='0.7'><path d='M0 300 Q 150 220 300 290 T 600 270'/><path d='M0 340 Q 150 260 300 330 T 600 310'/><path d='M0 380 Q 150 300 300 370 T 600 350'/><path d='M0 260 Q 150 180 300 250 T 600 230'/><path d='M0 220 Q 150 140 300 210 T 600 190'/><path d='M0 420 Q 150 340 300 410 T 600 390'/><path d='M0 180 Q 150 100 300 170 T 600 150'/><path d='M0 460 Q 150 380 300 450 T 600 430'/></g><g fill='none' stroke='%23E0967A' stroke-width='1' opacity='0.5'><circle cx='300' cy='300' r='40'/><circle cx='300' cy='300' r='80'/><circle cx='300' cy='300' r='120'/></g></svg>")`,
      backgroundSize: "600px 600px",
      backgroundColor: "#FAFAF6",
    },
    dark: {
      background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'><g fill='none' stroke='%23264558' stroke-width='1' opacity='0.7'><path d='M0 300 Q 150 220 300 290 T 600 270'/><path d='M0 340 Q 150 260 300 330 T 600 310'/><path d='M0 380 Q 150 300 300 370 T 600 350'/><path d='M0 260 Q 150 180 300 250 T 600 230'/><path d='M0 220 Q 150 140 300 210 T 600 190'/><path d='M0 420 Q 150 340 300 410 T 600 390'/><path d='M0 180 Q 150 100 300 170 T 600 150'/><path d='M0 460 Q 150 380 300 450 T 600 430'/></g><g fill='none' stroke='%23703D26' stroke-width='1' opacity='0.6'><circle cx='300' cy='300' r='40'/><circle cx='300' cy='300' r='80'/><circle cx='300' cy='300' r='120'/></g></svg>")`,
      backgroundSize: "600px 600px",
      backgroundColor: "#0F1318",
    },
  },
  {
    id: "lava",
    name: "Lava flow",
    desc: "Cooling magma streaks",
    light: {
      background: `
        radial-gradient(ellipse 600px 300px at 20% 20%, rgba(213, 88, 42, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 250px at 80% 80%, rgba(217, 164, 65, 0.15), transparent 60%),
        radial-gradient(ellipse 400px 200px at 50% 100%, rgba(184, 68, 23, 0.10), transparent 60%),
        repeating-linear-gradient(60deg, transparent 0, transparent 100px, rgba(213, 88, 42, 0.04) 100px, rgba(213, 88, 42, 0.04) 102px),
        #FBF6EE`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 600px 300px at 20% 20%, rgba(232, 153, 119, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 250px at 80% 80%, rgba(229, 196, 122, 0.10), transparent 60%),
        radial-gradient(ellipse 400px 200px at 50% 100%, rgba(213, 88, 42, 0.20), transparent 60%),
        repeating-linear-gradient(60deg, transparent 0, transparent 100px, rgba(232, 153, 119, 0.05) 100px, rgba(232, 153, 119, 0.05) 102px),
        #14100C`,
    },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    desc: "Engineering grid",
    light: {
      background: `
        linear-gradient(rgba(15, 76, 117, 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, rgba(15, 76, 117, 0.08) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(rgba(15, 76, 117, 0.18) 1px, transparent 1px) 0 0 / 120px 120px,
        linear-gradient(90deg, rgba(15, 76, 117, 0.18) 1px, transparent 1px) 0 0 / 120px 120px,
        radial-gradient(circle at 50% 50%, #ECF1F5 0%, #DCE6EE 100%)`,
    },
    dark: {
      background: `
        linear-gradient(rgba(74, 155, 199, 0.10) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(90deg, rgba(74, 155, 199, 0.10) 1px, transparent 1px) 0 0 / 24px 24px,
        linear-gradient(rgba(74, 155, 199, 0.22) 1px, transparent 1px) 0 0 / 120px 120px,
        linear-gradient(90deg, rgba(74, 155, 199, 0.22) 1px, transparent 1px) 0 0 / 120px 120px,
        radial-gradient(circle at 50% 50%, #0F2230 0%, #061018 100%)`,
    },
  },
  {
    id: "sundown",
    name: "Sundown",
    desc: "Dusk over Pico",
    light: {
      background: `
        radial-gradient(ellipse 80% 60% at 50% 100%, rgba(213, 88, 42, 0.4), transparent 70%),
        radial-gradient(ellipse 100% 60% at 50% 80%, rgba(217, 164, 65, 0.3), transparent 60%),
        radial-gradient(ellipse 60% 50% at 30% 30%, rgba(15, 76, 117, 0.15), transparent 60%),
        linear-gradient(180deg, #FBE4CB 0%, #F5C9A2 30%, #E5A48B 60%, #C77456 100%)`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 80% 60% at 50% 100%, rgba(213, 88, 42, 0.5), transparent 70%),
        radial-gradient(ellipse 100% 60% at 50% 90%, rgba(184, 68, 23, 0.3), transparent 60%),
        radial-gradient(ellipse 60% 50% at 30% 30%, rgba(11, 22, 32, 0.4), transparent 60%),
        linear-gradient(180deg, #1F0E0A 0%, #381810 30%, #4F1C0E 60%, #5C2417 100%)`,
    },
  },
  {
    id: "moss",
    name: "Moss",
    desc: "Green crater lake",
    light: {
      background: `
        radial-gradient(ellipse 700px 400px at 30% 70%, rgba(47, 110, 66, 0.18), transparent 60%),
        radial-gradient(ellipse 500px 300px at 80% 30%, rgba(74, 138, 92, 0.10), transparent 60%),
        repeating-linear-gradient(135deg, transparent 0, transparent 60px, rgba(47, 110, 66, 0.04) 60px, rgba(47, 110, 66, 0.04) 61px),
        #F4F6EC`,
    },
    dark: {
      background: `
        radial-gradient(ellipse 700px 400px at 30% 70%, rgba(141, 188, 154, 0.14), transparent 60%),
        radial-gradient(ellipse 500px 300px at 80% 30%, rgba(74, 138, 92, 0.18), transparent 60%),
        repeating-linear-gradient(135deg, transparent 0, transparent 60px, rgba(141, 188, 154, 0.04) 60px, rgba(141, 188, 154, 0.04) 61px),
        #0E1410`,
    },
  },
  {
    id: "dotmatrix",
    name: "Dot matrix",
    desc: "Calm pinpoint grid",
    light: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(15, 76, 117, 0.5) 1.2px, transparent 1.5px) 0 0 / 24px 24px,
        radial-gradient(circle at 50% 50%, rgba(213, 88, 42, 0.4) 1.5px, transparent 2px) 0 0 / 96px 96px,
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(74, 155, 199, 0.4) 1.2px, transparent 1.5px) 0 0 / 24px 24px,
        radial-gradient(circle at 50% 50%, rgba(232, 153, 119, 0.5) 1.5px, transparent 2px) 0 0 / 96px 96px,
        #0B0E12`,
    },
  },
  {
    id: "wave",
    name: "Wave",
    desc: "Hokusai stripes",
    light: {
      background: `
        repeating-radial-gradient(circle at 0% 100%, transparent 0, transparent 60px, rgba(15, 76, 117, 0.10) 60px, rgba(15, 76, 117, 0.10) 62px, transparent 62px, transparent 120px, rgba(15, 76, 117, 0.06) 120px, rgba(15, 76, 117, 0.06) 122px),
        repeating-radial-gradient(circle at 100% 0%, transparent 0, transparent 60px, rgba(213, 88, 42, 0.08) 60px, rgba(213, 88, 42, 0.08) 62px),
        #FAFAF7`,
    },
    dark: {
      background: `
        repeating-radial-gradient(circle at 0% 100%, transparent 0, transparent 60px, rgba(74, 155, 199, 0.10) 60px, rgba(74, 155, 199, 0.10) 62px, transparent 62px, transparent 120px, rgba(74, 155, 199, 0.06) 120px, rgba(74, 155, 199, 0.06) 122px),
        repeating-radial-gradient(circle at 100% 0%, transparent 0, transparent 60px, rgba(232, 153, 119, 0.08) 60px, rgba(232, 153, 119, 0.08) 62px),
        #0B0E12`,
    },
  },
  {
    id: "fog",
    name: "Fog",
    desc: "Misty mesh gradient",
    light: {
      background: `
        radial-gradient(at 12% 22%, rgba(15, 76, 117, 0.18) 0px, transparent 50%),
        radial-gradient(at 80% 18%, rgba(213, 88, 42, 0.14) 0px, transparent 50%),
        radial-gradient(at 78% 82%, rgba(47, 110, 66, 0.12) 0px, transparent 50%),
        radial-gradient(at 18% 78%, rgba(217, 164, 65, 0.14) 0px, transparent 50%),
        radial-gradient(at 50% 50%, rgba(255, 255, 255, 0.6) 0px, transparent 60%),
        #FAFAF7`,
    },
    dark: {
      background: `
        radial-gradient(at 12% 22%, rgba(74, 155, 199, 0.22) 0px, transparent 50%),
        radial-gradient(at 80% 18%, rgba(232, 153, 119, 0.18) 0px, transparent 50%),
        radial-gradient(at 78% 82%, rgba(141, 188, 154, 0.16) 0px, transparent 50%),
        radial-gradient(at 18% 78%, rgba(229, 196, 122, 0.14) 0px, transparent 50%),
        #0B0E12`,
    },
  },
  {
    id: "isobars",
    name: "Isobars",
    desc: "Pressure-line meteorology",
    light: {
      background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><g fill='none' stroke='%230F4C75' stroke-width='1' opacity='0.35'><circle cx='200' cy='200' r='40'/><circle cx='200' cy='200' r='80'/><circle cx='200' cy='200' r='130'/><circle cx='200' cy='200' r='190'/><circle cx='600' cy='600' r='50'/><circle cx='600' cy='600' r='110'/><circle cx='600' cy='600' r='180'/><circle cx='600' cy='600' r='260'/></g><g fill='none' stroke='%23D5582A' stroke-width='1' opacity='0.4'><text x='200' y='205' font-family='monospace' font-size='10' text-anchor='middle' stroke='none' fill='%23D5582A'>H</text><text x='600' y='605' font-family='monospace' font-size='10' text-anchor='middle' stroke='none' fill='%230F4C75'>L</text></g></svg>")`,
      backgroundSize: "800px 800px",
      backgroundColor: "#FBFAF5",
    },
    dark: {
      background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><g fill='none' stroke='%234A9BC7' stroke-width='1' opacity='0.4'><circle cx='200' cy='200' r='40'/><circle cx='200' cy='200' r='80'/><circle cx='200' cy='200' r='130'/><circle cx='200' cy='200' r='190'/><circle cx='600' cy='600' r='50'/><circle cx='600' cy='600' r='110'/><circle cx='600' cy='600' r='180'/><circle cx='600' cy='600' r='260'/></g><g><text x='200' y='205' font-family='monospace' font-size='10' text-anchor='middle' fill='%23E89977'>H</text><text x='600' y='605' font-family='monospace' font-size='10' text-anchor='middle' fill='%234A9BC7'>L</text></g></svg>")`,
      backgroundSize: "800px 800px",
      backgroundColor: "#0B0E12",
    },
  },
  {
    id: "noise",
    name: "Linen",
    desc: "Subtle paper noise",
    light: {
      background: `
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.08'/></svg>"),
        linear-gradient(120deg, #FBF8F1 0%, #F4F0E6 100%)`,
      backgroundSize: "200px 200px, auto",
    },
    dark: {
      background: `
        url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' /></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.18'/></svg>"),
        linear-gradient(120deg, #14161A 0%, #1B1E24 100%)`,
      backgroundSize: "200px 200px, auto",
    },
  },
];

/* ========== Page ========== */
function BackgroundsPage() {
  const [theme, setTheme] = uSb("light");
  const [active, setActive] = uSb("caldera");
  const [iconSize, setIconSize] = uSb(20);
  const [iconQuery, setIconQuery] = uSb("");
  const isDark = theme === "dark";

  const filteredIcons = uMb(() => {
    const q = iconQuery.trim().toLowerCase();
    const list = window.ICON_NAMES || [];
    return q ? list.filter(n => n.includes(q)) : list;
  }, [iconQuery]);

  const activeBg = BG_LIB.find(b => b.id === active) || BG_LIB[0];
  const previewStyle = isDark ? activeBg.dark : activeBg.light;

  const copyName = (name) => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`);
  };

  return (
    <div className="az-content">
      <div className="az-page-eyebrow">VISUAL LIBRARY</div>
      <h1 className="az-page-title">Backgrounds & Icons</h1>
      <p className="az-page-lead">
        Hand-tuned CSS backgrounds inspired by the Azores — caldera ridges, basalt hexes, ocean swells.
        Plus a {(window.ICON_NAMES || []).length}-icon library, every glyph drawn from a single 24px line system.
      </p>

      {/* Theme toggle for showcase */}
      <div className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Backgrounds</h2>
          <div className="az-row">
            <div className="az-tabs az-tabs--pill">
              <button className={`az-tab ${!isDark ? "is-active" : ""}`} onClick={() => setTheme("light")}>
                <Icon name="sun" size={12} /> Light
              </button>
              <button className={`az-tab ${isDark ? "is-active" : ""}`} onClick={() => setTheme("dark")}>
                <Icon name="moon" size={12} /> Dark
              </button>
            </div>
            <span className="az-section-sub">{BG_LIB.length} variants · adapts to theme</span>
          </div>
        </div>

        {/* Big preview */}
        <div style={{
          position: "relative",
          height: 360,
          borderRadius: "var(--az-r-lg)",
          border: "1px solid var(--az-line)",
          overflow: "hidden",
          marginBottom: 16,
          ...previewStyle,
        }}>
          <div style={{
            position: "absolute",
            bottom: 16, left: 16,
            background: isDark ? "rgba(20, 22, 26, 0.7)" : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--az-line)"}`,
            borderRadius: "var(--az-r-md)",
            padding: "10px 14px",
            color: isDark ? "#F0F1F3" : "var(--az-text)",
          }}>
            <div style={{ fontFamily: "var(--az-font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{activeBg.name}</div>
            <div style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.6)" : "var(--az-text-3)" }}>{activeBg.desc}</div>
          </div>
          <div style={{
            position: "absolute",
            top: 16, right: 16,
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "var(--az-font-mono)", fontSize: 11,
            color: isDark ? "rgba(255,255,255,0.5)" : "var(--az-text-3)",
            background: isDark ? "rgba(20, 22, 26, 0.7)" : "rgba(255, 255, 255, 0.85)",
            padding: "4px 8px",
            borderRadius: 4,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--az-line)"}`,
          }}>--bg-{activeBg.id}</div>
        </div>

        {/* Background grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
          {BG_LIB.map(bg => {
            const sty = isDark ? bg.dark : bg.light;
            const isActive = bg.id === active;
            return (
              <button key={bg.id} onClick={() => setActive(bg.id)}
                style={{
                  display: "block",
                  width: "100%",
                  height: 110,
                  borderRadius: "var(--az-r-md)",
                  border: isActive ? "2px solid var(--az-primary)" : "1px solid var(--az-line)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  padding: 0,
                  ...sty,
                  boxShadow: isActive ? "var(--az-ring)" : "none",
                }}
              >
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: `linear-gradient(0deg, ${isDark ? "rgba(11, 14, 18, 0.85)" : "rgba(250, 250, 247, 0.92)"} 0%, transparent 100%)`,
                  padding: "20px 10px 8px",
                  textAlign: "left",
                  color: isDark ? "#F0F1F3" : "var(--az-text)",
                }}>
                  <div style={{ fontFamily: "var(--az-font-display)", fontSize: 13, fontWeight: 500 }}>{bg.name}</div>
                  <div style={{ fontSize: 10, opacity: 0.7, fontFamily: "var(--az-font-mono)", marginTop: 1 }}>{bg.id}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ICONS */}
      <div className="az-section">
        <div className="az-section-head">
          <h2 className="az-section-title">Icon library</h2>
          <span className="az-section-sub">{(window.ICON_NAMES || []).length} glyphs · 24px grid · 1.6 stroke</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
          <div className="az-input-group" style={{ flex: 1, maxWidth: 360 }}>
            <span className="az-input-group-addon"><Icon name="search" size={14} /></span>
            <input className="az-input" placeholder="Search 150+ icons..." value={iconQuery} onChange={(e) => setIconQuery(e.target.value)} />
          </div>
          <div className="az-row" style={{ marginLeft: "auto" }}>
            <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Size</span>
            <div className="az-tabs az-tabs--pill">
              {[16, 20, 24, 32].map(s => (
                <button key={s} className={`az-tab ${iconSize === s ? "is-active" : ""}`} onClick={() => setIconSize(s)}>{s}px</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 4,
          border: "1px solid var(--az-line)",
          borderRadius: "var(--az-r-lg)",
          background: "var(--az-surface)",
          padding: 8,
        }}>
          {filteredIcons.map(name => (
            <button key={name} onClick={() => copyName(name)}
              title={`<Icon name="${name}" /> · click to copy`}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "16px 6px",
                border: "1px solid transparent",
                background: "none",
                borderRadius: "var(--az-r-sm)",
                cursor: "pointer",
                color: "var(--az-text)",
                transition: "all var(--az-dur-fast) var(--az-ease)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--az-bg-2)"; e.currentTarget.style.borderColor = "var(--az-line)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              <Icon name={name} size={iconSize} />
              <span style={{ fontSize: 10, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)", textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", whiteSpace: "nowrap" }}>{name}</span>
            </button>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div style={{ textAlign: "center", padding: 32, color: "var(--az-text-3)" }}>No icons match "{iconQuery}"</div>
        )}

        <div style={{ marginTop: 16, display: "flex", gap: 12, fontSize: 12, color: "var(--az-text-3)" }}>
          <span><Icon name="info" size={12} style={{ verticalAlign: "-2px" }} /> Click any icon to copy its <code className="az-code-inline">{`<Icon name="..." />`}</code> tag.</span>
        </div>
      </div>
    </div>
  );
}

window.BackgroundsPage = BackgroundsPage;
