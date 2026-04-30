// Azores — Command Palette (Cmd+K) for the whole app
const { useState: uSC, useEffect: uEC, useRef: uRC, useMemo: uMC } = React;

function CommandPalette({ open, setOpen, navigate, theme, setTheme, accent, setAccent }) {
  const [q, setQ] = uSC("");
  const [sel, setSel] = uSC(0);
  const inputRef = uRC(null);

  uEC(() => {
    if (open) {
      setQ(""); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  uEC(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen(o => !o); }
      else if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const commands = uMC(() => [
    // Navigation
    { id: "nav-found",   label: "Go to Foundations",   group: "Navigate", icon: "palette",   kw: "colors type tokens", run: () => navigate("foundations") },
    { id: "nav-comp",    label: "Go to Components",    group: "Navigate", icon: "box",       kw: "buttons inputs",     run: () => navigate("components") },
    { id: "nav-bg",      label: "Go to Backgrounds & Icons", group: "Navigate", icon: "sparkles", kw: "icon library",  run: () => navigate("backgrounds") },
    { id: "nav-ui",      label: "Go to UI showcase",   group: "Navigate", icon: "layout",    kw: "console mock",       run: () => navigate("ui") },
    { id: "nav-ux",      label: "Go to UX dashboard",  group: "Navigate", icon: "dashboard", kw: "widgets drag",       run: () => navigate("ux") },
    { id: "nav-md",      label: "Go to Markdown",      group: "Navigate", icon: "bookopen",  kw: "docs editor",        run: () => navigate("markdown") },
    // Theme
    { id: "th-light",    label: "Switch to Light theme", group: "Theme", icon: "sun",  run: () => setTheme("light") },
    { id: "th-dark",     label: "Switch to Dark theme",  group: "Theme", icon: "moon", run: () => setTheme("dark") },
    { id: "th-toggle",   label: "Toggle theme",          group: "Theme", icon: "settings", kw: "swap", run: () => setTheme(theme === "dark" ? "light" : "dark") },
    { id: "ac-ocean",    label: "Accent · Ocean",        group: "Theme", icon: "droplet", run: () => setAccent("ocean") },
    { id: "ac-volcanic", label: "Accent · Volcanic",     group: "Theme", icon: "flame",   run: () => setAccent("volcanic") },
    { id: "ac-mono",     label: "Accent · Mono",         group: "Theme", icon: "circle",  run: () => setAccent("mono") },
    { id: "ac-violet",   label: "Accent · Violet",       group: "Theme", icon: "sparkle", run: () => setAccent("violet") },
    // Actions
    { id: "act-new",     label: "New deployment",      group: "Actions", icon: "cloudup",  kw: "deploy ship",  run: () => alert("Deploy started.") },
    { id: "act-invite",  label: "Invite teammate",     group: "Actions", icon: "userplus", kw: "team",         run: () => alert("Invite sent.") },
    { id: "act-search",  label: "Search docs",         group: "Actions", icon: "bookopen", kw: "documentation",run: () => navigate("markdown") },
    { id: "act-issue",   label: "Open new issue",      group: "Actions", icon: "fileplus", kw: "bug ticket",   run: () => alert("Issue opened.") },
    { id: "act-key",     label: "Generate API key",    group: "Actions", icon: "key",      kw: "token auth",   run: () => alert("Key created.") },
    { id: "act-logs",    label: "View logs",           group: "Actions", icon: "terminal", kw: "console",      run: () => alert("Tail logs…") },
    { id: "act-billing", label: "View billing",        group: "Actions", icon: "creditcard", kw: "invoice",    run: () => alert("Billing →") },
    // Help
    { id: "h-shortcuts", label: "Keyboard shortcuts",  group: "Help",    icon: "command",  run: () => alert("⌘K · ⌘B · ⌘/") },
    { id: "h-status",    label: "System status",       group: "Help",    icon: "activity", run: () => alert("All systems operational.") },
    { id: "h-signout",   label: "Sign out",            group: "Account", icon: "power",    run: () => { if (confirm("Sign out?")) location.reload(); } },
  ], [navigate, theme, setTheme, setAccent]);

  const filtered = uMC(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter(c => (c.label + " " + (c.kw || "") + " " + c.group).toLowerCase().includes(s));
  }, [q, commands]);

  uEC(() => { setSel(0); }, [q]);
  uEC(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === "Enter" && filtered[sel]) { e.preventDefault(); filtered[sel].run(); setOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel]);

  if (!open) return null;

  // Group results
  const groups = {};
  filtered.forEach((c, idx) => {
    if (!groups[c.group]) groups[c.group] = [];
    groups[c.group].push({ ...c, _idx: idx });
  });

  return (
    <div className="az-modal-backdrop" onClick={() => setOpen(false)} style={{ alignItems: "flex-start", paddingTop: "12vh" }}>
      <div className="az-modal" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--az-line)" }}>
          <Icon name="search" size={16} style={{ color: "var(--az-text-3)" }} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command, search anything…"
            style={{ flex: 1, border: "none", outline: "none", background: "none", fontSize: 15, color: "var(--az-text)", fontFamily: "inherit" }} />
          <span className="az-kbd">ESC</span>
        </div>
        <div style={{ maxHeight: 440, overflowY: "auto", padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: 32, textAlign: "center", color: "var(--az-text-3)", fontSize: 13 }}>No results for "{q}"</div>
          )}
          {Object.entries(groups).map(([g, items]) => (
            <div key={g}>
              <div className="az-menu-label">{g}</div>
              {items.map(c => (
                <button key={c.id}
                  onClick={() => { c.run(); setOpen(false); }}
                  onMouseEnter={() => setSel(c._idx)}
                  className="az-menu-item"
                  style={{
                    background: sel === c._idx ? "var(--az-bg-2)" : "transparent",
                    color: sel === c._idx ? "var(--az-text)" : "var(--az-text-2)",
                    width: "100%",
                  }}>
                  <Icon name={c.icon === "command" ? "terminal" : c.icon === "circle" ? "moreh" : c.icon} size={14} style={{ color: "var(--az-text-3)" }} />
                  <span style={{ flex: 1, textAlign: "left" }}>{c.label}</span>
                  {sel === c._idx && <span style={{ fontSize: 11, color: "var(--az-text-3)" }}>↵</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, padding: "8px 16px", borderTop: "1px solid var(--az-line)", background: "var(--az-bg-2)", fontSize: 11, color: "var(--az-text-3)" }}>
          <span><span className="az-kbd">↑</span> <span className="az-kbd">↓</span> Navigate</span>
          <span><span className="az-kbd">↵</span> Select</span>
          <div style={{ flex: 1 }}></div>
          <span style={{ fontFamily: "var(--az-font-mono)" }}>{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}

window.CommandPalette = CommandPalette;
