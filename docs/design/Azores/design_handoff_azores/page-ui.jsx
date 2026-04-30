// Azores — UI Showcase: live mock of an Azores corporate app
const { useState: useStateUi } = React;

function UIShowcase() {
  const [step, setStep] = useStateUi(2);
  const [tab, setTab] = useStateUi("overview");

  return (
    <div className="az-content az-content--full">
      <div className="az-page-eyebrow">AZORES UI</div>
      <h1 className="az-page-title">Components composed into a real product surface.</h1>
      <p className="az-page-lead">
        A snapshot of an Azores Cloud console — navigation, workspace switcher, KPI cards,
        deploy timeline, and team activity, all built from the primitives.
      </p>

      {/* Mock app frame */}
      <div style={{ border: "1px solid var(--az-line)", borderRadius: 14, overflow: "hidden", background: "var(--az-bg)", boxShadow: "var(--az-shadow-md)" }}>
        {/* App header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 16px", borderBottom: "1px solid var(--az-line)", background: "var(--az-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="az-brand-mark" style={{ width: 24, height: 24 }}></div>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Azores Cloud</span>
            <Icon name="chevright" size={12} style={{ color: "var(--az-text-3)" }} />
            <span className="az-badge az-badge--ocean">acme-prod</span>
            <Icon name="chevdown" size={12} style={{ color: "var(--az-text-3)" }} />
          </div>
          <div className="az-input-group" style={{ flex: 1, maxWidth: 420 }}>
            <span className="az-input-group-addon"><Icon name="search" size={14} /></span>
            <input className="az-input" placeholder="Search services, deploys, logs…" />
            <span className="az-input-group-addon az-input-group-addon--right"><span className="az-kbd">⌘K</span></span>
          </div>
          <div style={{ flex: 1 }}></div>
          <button className="az-btn az-btn--ghost az-btn--icon az-btn--sm"><Icon name="bell" /></button>
          <button className="az-btn az-btn--ghost az-btn--icon az-btn--sm"><Icon name="settings" /></button>
          <span className="az-avatar az-avatar--sm" style={{ background: "var(--az-lava-400)" }}>CR</span>
        </div>

        {/* Two-col body */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
          {/* Sidebar */}
          <div style={{ borderRight: "1px solid var(--az-line)", padding: 12, background: "var(--az-bg-2)" }}>
            <div className="az-nav-section">Workspace</div>
            {[["dashboard", "Overview", true], ["box", "Services"], ["activity", "Deploys"], ["chart", "Metrics"], ["inbox", "Logs"], ["lock", "Secrets"]].map(([icon, label, active], i) => (
              <button key={label} className={`az-nav-item ${active ? "is-active" : ""}`}>
                <Icon name={icon} className="az-nav-icon" />{label}
              </button>
            ))}
            <div className="az-nav-section">Team</div>
            {[["user", "Members"], ["folder", "Projects"], ["bookmark", "Saved"]].map(([icon, label]) => (
              <button key={label} className="az-nav-item">
                <Icon name={icon} className="az-nav-icon" />{label}
              </button>
            ))}
          </div>

          {/* Main */}
          <div style={{ padding: 24, minHeight: 640 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <h2 style={{ fontFamily: "var(--az-font-display)", fontSize: 28, fontWeight: 500, margin: 0, letterSpacing: "-0.02em" }}>Overview</h2>
              <span className="az-badge az-badge--moss"><span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }}></span>All systems healthy</span>
            </div>
            <p style={{ color: "var(--az-text-3)", fontSize: 14, marginTop: 0, marginBottom: 20 }}>Production environment · Last updated 12s ago</p>

            <div className="az-tabs">
              {["overview", "services", "deploys", "billing"].map(t => (
                <button key={t} className={`az-tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>
              ))}
            </div>

            {/* KPIs */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
              {[
                ["Requests · 24h", "4.82M", "+12.4%", "up"],
                ["p95 latency", "118ms", "-3.1%", "up"],
                ["Error rate", "0.04%", "+0.01%", "dn"],
                ["Compute spent", "$1,284", "-8.2%", "up"],
              ].map(([label, val, delta, dir]) => (
                <div key={label} className="az-card az-card--hover">
                  <div className="az-card-body">
                    <div className="az-stat-label">{label}</div>
                    <div className="az-stat-num" style={{ marginTop: 6 }}>{val}</div>
                    <div className={`az-stat-delta az-stat-delta--${dir}`} style={{ marginTop: 4 }}>
                      <Icon name={dir === "up" ? "arrowup" : "arrowdown"} size={11} />{delta} vs last week
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Two-up: chart + activity */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
              <div className="az-card">
                <div className="az-card-header">
                  <h3 className="az-card-title">Request volume</h3>
                  <div className="az-tabs--pill az-tabs">
                    <button className="az-tab is-active">24h</button>
                    <button className="az-tab">7d</button>
                    <button className="az-tab">30d</button>
                  </div>
                </div>
                <div className="az-card-body" style={{ padding: 16 }}>
                  <Sparkline />
                </div>
              </div>

              <div className="az-card">
                <div className="az-card-header">
                  <h3 className="az-card-title">Recent deploys</h3>
                  <button className="az-btn az-btn--ghost az-btn--sm">View all</button>
                </div>
                <div className="az-card-body" style={{ padding: 0 }}>
                  {[
                    ["fix(billing): retry timeouts", "main", "2m", "moss", "success"],
                    ["feat(api): batch endpoint", "preview/63", "14m", "ocean", "info"],
                    ["chore: bump deps", "main", "1h", "moss", "success"],
                    ["wip: experiment", "preview/61", "3h", "amber", "warn"],
                    ["fix(auth): redirect loop", "main", "yesterday", "coral", "error"],
                  ].map(([msg, branch, time, c, ic], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: i < 4 ? "1px solid var(--az-line)" : "none" }}>
                      <div style={{ width: 26, height: 26, borderRadius: 999, background: `var(--az-${c === "moss" ? "moss" : c === "ocean" ? "ocean" : c === "amber" ? "amber" : "coral"}-${c === "ocean" ? "100" : "50"})`, color: `var(--az-${c}-500)`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <Icon name={ic === "success" ? "check" : ic === "warn" ? "warn" : ic === "error" ? "error" : "git"} size={12} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg}</div>
                        <div style={{ fontSize: 11, color: "var(--az-text-3)", fontFamily: "var(--az-font-mono)", marginTop: 1 }}>{branch}</div>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--az-text-3)" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="az-card" style={{ marginTop: 16 }}>
              <div className="az-card-header"><h3 className="az-card-title">Onboard a new service</h3></div>
              <div className="az-card-body">
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {["Connect repo", "Choose region", "Configure", "Deploy"].map((label, i) => (
                    <div key={label} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 999, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600,
                        background: i < step ? "var(--az-moss-500)" : i === step ? "var(--az-primary)" : "var(--az-bg-2)",
                        color: i <= step ? "white" : "var(--az-text-3)",
                        border: i === step ? "none" : i < step ? "none" : "1px solid var(--az-line)" }}>
                        {i < step ? <Icon name="check" size={12} /> : i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: i <= step ? "var(--az-text)" : "var(--az-text-3)", fontWeight: i === step ? 500 : 400 }}>{label}</span>
                      {i < 3 && <div style={{ flex: 1, height: 1, background: i < step ? "var(--az-moss-500)" : "var(--az-line)" }}></div>}
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="az-field">
                    <label className="az-label">Service name</label>
                    <input className="az-input" defaultValue="recommendations-api" />
                  </div>
                  <div className="az-field">
                    <label className="az-label">Region</label>
                    <select className="az-select"><option>Lisbon (eu-west-1)</option></select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
                  <button className="az-btn" onClick={() => setStep(Math.max(0, step - 1))}>Back</button>
                  <button className="az-btn az-btn--primary" onClick={() => setStep(Math.min(3, step + 1))}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  // Generate a deterministic line with shaded area
  const pts = [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52, 58, 50, 62, 68, 60, 72, 78, 70, 82, 88, 80];
  const w = 800, h = 220, pad = 16;
  const max = Math.max(...pts);
  const xs = pts.map((_, i) => pad + (i * (w - pad * 2)) / (pts.length - 1));
  const ys = pts.map(v => h - pad - (v / max) * (h - pad * 2));
  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  const areaPath = `${linePath} L ${xs[xs.length - 1]} ${h - pad} L ${xs[0]} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 220, display: "block" }}>
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--az-primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--az-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={pad} y1={pad + (i * (h - pad * 2)) / 3} x2={w - pad} y2={pad + (i * (h - pad * 2)) / 3} stroke="var(--az-line)" strokeDasharray="2 4" />
      ))}
      <path d={areaPath} fill="url(#spk)" />
      <path d={linePath} fill="none" stroke="var(--az-primary)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {xs.map((x, i) => i % 6 === 0 && (
        <circle key={i} cx={x} cy={ys[i]} r="3" fill="var(--az-bg)" stroke="var(--az-primary)" strokeWidth="2" />
      ))}
    </svg>
  );
}

window.UIShowcase = UIShowcase;
