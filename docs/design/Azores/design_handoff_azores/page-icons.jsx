// Azores — dedicated Icons page
const { useState: uSi, useMemo: uMi, useRef: uRi, useEffect: uEi } = React;

function IconsPage() {
  const [query, setQuery] = uSi("");
  const [size, setSize] = uSi(20);
  const [stroke, setStroke] = uSi(1.6);
  const [activeGroup, setActiveGroup] = uSi("all");
  const [picked, setPicked] = uSi(null); // { name, group } | null
  const [toast, setToast] = uSi(null);
  const sectionRefs = uRi({});

  const groups = window.ICON_GROUPS || [];
  const total = (window.ICON_NAMES || []).length;

  const filteredGroups = uMi(() => {
    const q = query.trim().toLowerCase();
    return groups
      .map(g => ({
        ...g,
        icons: g.icons.filter(n => !q || n.toLowerCase().includes(q)),
      }))
      .filter(g => g.icons.length > 0 && (activeGroup === "all" || activeGroup === g.name));
  }, [query, activeGroup, groups]);

  const filteredCount = uMi(() => filteredGroups.reduce((s, g) => s + g.icons.length, 0), [filteredGroups]);

  function copy(text, label) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement("textarea"); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    setToast(label || "Copied");
    setTimeout(() => setToast(null), 1400);
  }

  function pick(name, group) {
    setPicked({ name, group });
    copy(`<Icon name="${name}" />`, `Copied <Icon name="${name}" />`);
  }

  function jumpTo(groupName) {
    setActiveGroup(groupName);
    setTimeout(() => {
      const el = sectionRefs.current[groupName];
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
  }

  const accent = "var(--az-accent-500)";

  return (
    <div className="az-content">
      <div className="az-page-eyebrow">VISUAL LIBRARY</div>
      <h1 className="az-page-title">Icons</h1>
      <p className="az-page-lead">
        A {total}-icon set drawn on a single 24×24 grid with a 1.6 stroke. Every glyph is a single-character reference — <code className="az-code-inline">{`<Icon name="..." />`}</code> — with tweakable size and stroke. Click any icon to copy its tag.
      </p>

      {/* Sticky toolbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "var(--az-bg)",
        borderBottom: "1px solid var(--az-line)",
        margin: "16px -32px 0",
        padding: "12px 32px",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <div className="az-input-group" style={{ flex: "1 1 280px", maxWidth: 420 }}>
            <span className="az-input-group-addon"><Icon name="search" size={14} /></span>
            <input
              className="az-input"
              placeholder={`Search ${total} icons by name...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                className="az-input-group-addon"
                style={{ cursor: "pointer", background: "none", border: 0 }}
                onClick={() => setQuery("")}
                title="Clear"
              >
                <Icon name="x" size={14} />
              </button>
            )}
          </div>

          <div className="az-row" style={{ gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Size</span>
            <div className="az-tabs az-tabs--pill">
              {[16, 20, 24, 32, 40].map(s => (
                <button key={s} className={`az-tab ${size === s ? "is-active" : ""}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div className="az-row" style={{ gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--az-text-3)" }}>Stroke</span>
            <input
              type="range" min="1" max="2.5" step="0.1"
              value={stroke}
              onChange={(e) => setStroke(parseFloat(e.target.value))}
              style={{ width: 100, accentColor: "var(--az-accent-500)" }}
            />
            <span style={{ fontSize: 12, color: "var(--az-text-2)", fontFamily: "var(--az-font-mono)", minWidth: 28 }}>{stroke.toFixed(1)}</span>
          </div>

          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--az-text-3)" }}>
            {filteredCount} of {total}
          </div>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 4 }}>
          <button
            className={`az-chip ${activeGroup === "all" ? "is-active" : ""}`}
            onClick={() => { setActiveGroup("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >All <span style={{ opacity: 0.5, marginLeft: 4 }}>{total}</span></button>
          {groups.map(g => (
            <button
              key={g.name}
              className={`az-chip ${activeGroup === g.name ? "is-active" : ""}`}
              onClick={() => jumpTo(g.name)}
              title={`${g.icons.length} icons`}
            >{g.name} <span style={{ opacity: 0.5, marginLeft: 4 }}>{g.icons.length}</span></button>
          ))}
        </div>
      </div>

      {/* Detail card for picked icon */}
      {picked && (
        <div style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 24,
          padding: 20,
          border: "1px solid var(--az-line)",
          borderRadius: "var(--az-r-lg)",
          background: "var(--az-surface)",
          alignItems: "center",
        }}>
          <div style={{
            width: 96, height: 96,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--az-bg-2)",
            border: "1px solid var(--az-line)",
            borderRadius: "var(--az-r-lg)",
            color: "var(--az-accent-500)",
          }}>
            <Icon name={picked.name} size={48} strokeWidth={stroke} />
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.08em", color: "var(--az-text-3)", textTransform: "uppercase", marginBottom: 4 }}>
              {picked.group}
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "var(--az-font-mono)", color: "var(--az-text)" }}>
              {picked.name}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {[16, 20, 24, 32, 40].map(s => (
                <div key={s} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  padding: "8px 12px",
                  border: "1px solid var(--az-line)",
                  borderRadius: "var(--az-r-md)",
                  background: "var(--az-bg)",
                }}>
                  <Icon name={picked.name} size={s} strokeWidth={stroke} />
                  <span style={{ fontSize: 9, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)" }}>{s}px</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="az-btn az-btn--primary" onClick={() => copy(`<Icon name="${picked.name}" />`, "Tag copied")}>
              <Icon name="copy" size={14} /> Copy tag
            </button>
            <button className="az-btn" onClick={() => copy(picked.name, "Name copied")}>
              <Icon name="copy" size={14} /> Copy name
            </button>
            <button className="az-btn" onClick={() => setPicked(null)}>
              <Icon name="x" size={14} /> Close
            </button>
          </div>
        </div>
      )}

      {/* Sections */}
      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 36 }}>
        {filteredGroups.map(g => (
          <section key={g.name} ref={(el) => (sectionRefs.current[g.name] = el)}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--az-text)", margin: 0 }}>{g.name}</h2>
              <div style={{ flex: 1, height: 1, background: "var(--az-line)" }} />
              <span style={{ fontSize: 12, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)" }}>{g.icons.length}</span>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(108px, 1fr))",
              gap: 4,
              border: "1px solid var(--az-line)",
              borderRadius: "var(--az-r-lg)",
              background: "var(--az-surface)",
              padding: 8,
            }}>
              {g.icons.map(name => {
                const isPicked = picked?.name === name;
                return (
                  <button
                    key={name}
                    onClick={() => pick(name, g.name)}
                    title={`<Icon name="${name}" />`}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      padding: "18px 6px 10px",
                      border: "1px solid " + (isPicked ? "var(--az-accent-500)" : "transparent"),
                      background: isPicked ? "var(--az-accent-50, var(--az-bg-2))" : "none",
                      borderRadius: "var(--az-r-md)",
                      cursor: "pointer",
                      color: isPicked ? "var(--az-accent-600, var(--az-text))" : "var(--az-text)",
                      transition: "all var(--az-dur-fast) var(--az-ease)",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (!isPicked) {
                        e.currentTarget.style.background = "var(--az-bg-2)";
                        e.currentTarget.style.borderColor = "var(--az-line)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isPicked) {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    <Icon name={name} size={size} strokeWidth={stroke} />
                    <span style={{
                      fontSize: 10,
                      color: isPicked ? "var(--az-accent-600, var(--az-text))" : "var(--az-text-3)",
                      fontFamily: "var(--az-font-mono)",
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      whiteSpace: "nowrap",
                    }}>{name}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {filteredGroups.length === 0 && (
          <div style={{
            textAlign: "center", padding: 64,
            color: "var(--az-text-3)",
            border: "1px dashed var(--az-line)",
            borderRadius: "var(--az-r-lg)",
            background: "var(--az-surface)",
          }}>
            <Icon name="search" size={32} style={{ opacity: 0.4 }} />
            <div style={{ marginTop: 12, fontSize: 14 }}>No icons match "{query}"</div>
            <button className="az-btn" style={{ marginTop: 12 }} onClick={() => { setQuery(""); setActiveGroup("all"); }}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Usage block */}
      <div style={{
        marginTop: 48,
        padding: 20,
        border: "1px solid var(--az-line)",
        borderRadius: "var(--az-r-lg)",
        background: "var(--az-surface)",
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "var(--az-text)" }}>Usage</h3>
        <p style={{ fontSize: 13, color: "var(--az-text-2)", margin: "8px 0 12px" }}>
          Every icon takes the same props. Stroke + size are inherited from the call site so they always tune to your local context.
        </p>
        <pre style={{
          margin: 0, padding: 12,
          background: "var(--az-bg-2)",
          border: "1px solid var(--az-line)",
          borderRadius: "var(--az-r-md)",
          fontFamily: "var(--az-font-mono)",
          fontSize: 12,
          color: "var(--az-text-2)",
          overflowX: "auto",
        }}>{`<Icon name="rocket" />
<Icon name="rocket" size={20} />
<Icon name="rocket" size={32} strokeWidth={2} />
<Icon name="rocket" className="text-accent" />`}</pre>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "var(--az-text)", color: "var(--az-bg)",
          padding: "10px 16px",
          borderRadius: "var(--az-r-md)",
          fontSize: 13, fontWeight: 500,
          boxShadow: "var(--az-shadow-lg)",
          display: "flex", alignItems: "center", gap: 8,
          zIndex: 100,
          animation: "az-toast-in 0.2s var(--az-ease)",
        }}>
          <Icon name="check" size={14} />
          {toast}
        </div>
      )}

      <style>{`
        @keyframes az-toast-in {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .az-chip {
          display: inline-flex; align-items: center;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--az-text-2);
          background: var(--az-surface);
          border: 1px solid var(--az-line);
          border-radius: 999px;
          cursor: pointer;
          white-space: nowrap;
          transition: all var(--az-dur-fast) var(--az-ease);
        }
        .az-chip:hover {
          background: var(--az-bg-2);
          color: var(--az-text);
        }
        .az-chip.is-active {
          background: var(--az-text);
          color: var(--az-bg);
          border-color: var(--az-text);
        }
      `}</style>
    </div>
  );
}

window.IconsPage = IconsPage;
