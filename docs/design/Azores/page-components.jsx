// Azores — Components Gallery
const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

function DemoCard({ label, children }) {
  return (
    <div className="az-demo-card">
      <div className="az-demo-stage">{children}</div>
      <div className="az-demo-label">{label}</div>
    </div>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button className="az-switch" aria-checked={checked} role="switch" onClick={() => onChange(!checked)}></button>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="az-modal-backdrop" onClick={onClose}>
      <div className="az-modal" onClick={(e) => e.stopPropagation()}>
        <div className="az-modal-header">
          <h3 className="az-modal-title">{title}</h3>
          <button className="az-btn az-btn--ghost az-btn--icon az-btn--sm" onClick={onClose}><Icon name="x" /></button>
        </div>
        <div className="az-modal-body">{children}</div>
        {footer && <div className="az-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function ToastStack({ toasts }) {
  return (
    <div className="az-toasts">
      {toasts.map(t => (
        <div key={t.id} className={`az-toast az-toast--${t.kind}`}>
          <div className="az-toast-icon"><Icon name={t.kind === "success" ? "check" : t.kind === "warning" ? "warn" : t.kind === "danger" ? "error" : "info"} size={14} /></div>
          <div className="az-toast-body">
            <div className="az-toast-title">{t.title}</div>
            {t.msg && <div className="az-toast-msg">{t.msg}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComponentsPage() {
  const [tab, setTab] = useStateC("overview");
  const [modal, setModal] = useStateC(false);
  const [toasts, setToasts] = useStateC([]);
  const [check, setCheck] = useStateC(true);
  const [radio, setRadio] = useStateC("a");
  const [sw, setSw] = useStateC(true);
  const [slider, setSlider] = useStateC(60);
  const [pillTab, setPillTab] = useStateC("week");
  const [menu, setMenu] = useStateC(false);

  const fireToast = (kind) => {
    const id = Date.now();
    const t = { id, kind, title: { success: "Deployed to production", warning: "Quota almost reached", danger: "Build failed", info: "Sync complete" }[kind], msg: { success: "azores-prod · 2 services updated", warning: "92% of monthly minutes used", danger: "Step `lint` exited with code 1", info: "12 records updated · 3 ignored" }[kind] };
    setToasts(prev => [...prev, t]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 3500);
  };

  return (
    <div className="az-content">
      <div className="az-page-eyebrow">COMPONENTS</div>
      <h1 className="az-page-title">A complete, composable kit.</h1>
      <p className="az-page-lead">
        Every primitive a corporate product needs — buttons, forms, navigation, overlays,
        feedback, data — built on the same tokens and ready to drop into any surface.
      </p>

      <div className="az-tabs">
        {["overview", "buttons", "inputs", "feedback", "data"].map(t => (
          <button key={t} className={`az-tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>{t[0].toUpperCase() + t.slice(1)}</button>
        ))}
      </div>

      {/* BUTTONS */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Buttons</h2></div>
        <div className="az-demo">
          <DemoCard label="Variants">
            <button className="az-btn az-btn--primary">Primary</button>
            <button className="az-btn az-btn--ocean">Ocean</button>
            <button className="az-btn az-btn--accent">Lava</button>
            <button className="az-btn">Default</button>
            <button className="az-btn az-btn--ghost">Ghost</button>
            <button className="az-btn az-btn--danger">Delete</button>
          </DemoCard>
          <DemoCard label="Sizes">
            <button className="az-btn az-btn--primary az-btn--sm">Small</button>
            <button className="az-btn az-btn--primary">Default</button>
            <button className="az-btn az-btn--primary az-btn--lg">Large</button>
          </DemoCard>
          <DemoCard label="With icons">
            <button className="az-btn az-btn--primary"><Icon name="plus" />New project</button>
            <button className="az-btn"><Icon name="copy" />Copy</button>
            <button className="az-btn az-btn--icon" aria-label="more"><Icon name="morev" /></button>
          </DemoCard>
          <DemoCard label="States">
            <button className="az-btn az-btn--primary"><span className="az-spinner" style={{ borderTopColor: "white", borderColor: "rgba(255,255,255,0.3)" }}></span>Saving…</button>
            <button className="az-btn" disabled>Disabled</button>
          </DemoCard>
        </div>
      </section>

      {/* FORM */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Form controls</h2></div>
        <div className="az-demo">
          <DemoCard label="Text input">
            <div className="az-field" style={{ width: "100%" }}>
              <label className="az-label">Email</label>
              <input className="az-input" placeholder="you@example.com" defaultValue="catarina@azores.app" />
              <div className="az-help">We'll never share your email.</div>
            </div>
          </DemoCard>
          <DemoCard label="Group / addon">
            <div className="az-field" style={{ width: "100%" }}>
              <label className="az-label">Domain</label>
              <div className="az-input-group">
                <span className="az-input-group-addon">https://</span>
                <input className="az-input" defaultValue="atlas-prod" />
                <span className="az-input-group-addon az-input-group-addon--right">.azores.app</span>
              </div>
            </div>
          </DemoCard>
          <DemoCard label="Select & textarea">
            <div className="az-field" style={{ width: "100%" }}>
              <label className="az-label">Region</label>
              <select className="az-select" defaultValue="lis">
                <option value="lis">Lisbon (eu-west-1)</option>
                <option value="fra">Frankfurt (eu-central-1)</option>
                <option value="iad">N. Virginia (us-east-1)</option>
              </select>
            </div>
          </DemoCard>
          <DemoCard label="Checkbox / Radio / Switch">
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
              <label className="az-check"><input type="checkbox" checked={check} onChange={e => setCheck(e.target.checked)} />Enable telemetry</label>
              <label className="az-radio"><input type="radio" name="r" checked={radio === "a"} onChange={() => setRadio("a")} />Production</label>
              <label className="az-radio"><input type="radio" name="r" checked={radio === "b"} onChange={() => setRadio("b")} />Preview</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Switch checked={sw} onChange={setSw} /><span style={{ fontSize: 13 }}>Auto-deploy main</span></div>
            </div>
          </DemoCard>
          <DemoCard label="Slider">
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--az-text-3)", marginBottom: 6 }}>
                <span>CPU limit</span><span className="az-text-mono">{slider}%</span>
              </div>
              <input type="range" min="0" max="100" value={slider} onChange={e => setSlider(+e.target.value)} className="az-slider" />
            </div>
          </DemoCard>
          <DemoCard label="Validation">
            <div className="az-field" style={{ width: "100%" }}>
              <label className="az-label">Slug</label>
              <input className="az-input az-input--invalid" defaultValue="My Project!!" />
              <div className="az-help az-help--error">Only lowercase letters, numbers and dashes.</div>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* OVERLAYS */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Overlays</h2></div>
        <div className="az-demo">
          <DemoCard label="Modal">
            <button className="az-btn az-btn--primary" onClick={() => setModal(true)}>Open dialog</button>
          </DemoCard>
          <DemoCard label="Dropdown menu">
            <div style={{ position: "relative" }}>
              <button className="az-btn" onClick={() => setMenu(!menu)}>Actions <Icon name="chevdown" size={14} /></button>
              {menu && (
                <div className="az-menu" style={{ position: "absolute", top: 40, left: 0 }} onMouseLeave={() => setMenu(false)}>
                  <div className="az-menu-label">Project</div>
                  <button className="az-menu-item"><Icon name="edit" />Rename</button>
                  <button className="az-menu-item"><Icon name="copy" />Duplicate</button>
                  <button className="az-menu-item"><Icon name="bookmark" />Star</button>
                  <div className="az-menu-divider"></div>
                  <button className="az-menu-item az-menu-item--danger"><Icon name="trash" />Delete project</button>
                </div>
              )}
            </div>
          </DemoCard>
          <DemoCard label="Tooltip">
            <span className="az-tooltip">⌘K · Open command bar</span>
          </DemoCard>
          <DemoCard label="Toasts">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              <button className="az-btn az-btn--sm" onClick={() => fireToast("success")}>Success</button>
              <button className="az-btn az-btn--sm" onClick={() => fireToast("warning")}>Warning</button>
              <button className="az-btn az-btn--sm" onClick={() => fireToast("danger")}>Danger</button>
              <button className="az-btn az-btn--sm" onClick={() => fireToast("info")}>Info</button>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Feedback</h2></div>
        <div className="az-stack">
          <div className="az-alert az-alert--info">
            <div className="az-alert-icon"><Icon name="info" size={18} /></div>
            <div><div className="az-alert-title">New region available</div><p className="az-alert-msg">São Miguel (eu-azo-1) is now in general availability with sub-20ms latency to mainland Portugal.</p></div>
          </div>
          <div className="az-alert az-alert--success">
            <div className="az-alert-icon"><Icon name="success" size={18} /></div>
            <div><div className="az-alert-title">Deployment complete</div><p className="az-alert-msg">All 12 services healthy. Rolled out to 100% of traffic in 2m 14s.</p></div>
          </div>
          <div className="az-alert az-alert--warning">
            <div className="az-alert-icon"><Icon name="warn" size={18} /></div>
            <div><div className="az-alert-title">Approaching quota</div><p className="az-alert-msg">You've used 92% of your monthly compute minutes.</p></div>
          </div>
          <div className="az-alert az-alert--danger">
            <div className="az-alert-icon"><Icon name="error" size={18} /></div>
            <div><div className="az-alert-title">Build failed</div><p className="az-alert-msg">Step `lint` exited with code 1. Check logs for details.</p></div>
          </div>
        </div>

        <div className="az-demo" style={{ marginTop: 24 }}>
          <DemoCard label="Progress">
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}><span>Build</span><span className="az-text-mono">68%</span></div>
              <div className="az-progress"><div className="az-progress-bar" style={{ width: "68%" }}></div></div>
            </div>
          </DemoCard>
          <DemoCard label="Spinner">
            <span className="az-spinner"></span> <span style={{ fontSize: 13, color: "var(--az-text-3)" }}>Loading metrics…</span>
          </DemoCard>
          <DemoCard label="Skeleton">
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="az-skeleton" style={{ height: 14, width: "70%" }}></div>
              <div className="az-skeleton" style={{ height: 10, width: "100%" }}></div>
              <div className="az-skeleton" style={{ height: 10, width: "90%" }}></div>
            </div>
          </DemoCard>
        </div>
      </section>

      {/* BADGES & CHIPS */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Badges, Chips & Avatars</h2></div>
        <div className="az-demo">
          <DemoCard label="Status badges">
            <span className="az-badge az-badge--moss"><Icon name="check" size={10} />Healthy</span>
            <span className="az-badge az-badge--ocean">In review</span>
            <span className="az-badge az-badge--lava">Beta</span>
            <span className="az-badge az-badge--amber">Throttled</span>
            <span className="az-badge az-badge--coral">Down</span>
            <span className="az-badge az-badge--solid">v2.4.1</span>
          </DemoCard>
          <DemoCard label="Chips">
            <span className="az-chip">design <button className="az-chip-x"><Icon name="x" size={10} /></button></span>
            <span className="az-chip">infra <button className="az-chip-x"><Icon name="x" size={10} /></button></span>
            <span className="az-chip">priority/p1 <button className="az-chip-x"><Icon name="x" size={10} /></button></span>
          </DemoCard>
          <DemoCard label="Avatars">
            <div className="az-avatars">
              <span className="az-avatar" style={{ background: "var(--az-ocean-500)" }}>CR</span>
              <span className="az-avatar" style={{ background: "var(--az-lava-400)" }}>JM</span>
              <span className="az-avatar" style={{ background: "var(--az-moss-500)" }}>SP</span>
              <span className="az-avatar" style={{ background: "var(--az-amber-500)" }}>+4</span>
            </div>
          </DemoCard>
          <DemoCard label="Tabs (pill)">
            <div className="az-tabs--pill az-tabs">
              {["day","week","month","quarter"].map(k => (
                <button key={k} className={`az-tab ${pillTab === k ? "is-active" : ""}`} onClick={() => setPillTab(k)}>{k}</button>
              ))}
            </div>
          </DemoCard>
        </div>
      </section>

      {/* DATA */}
      <section className="az-section">
        <div className="az-section-head"><h2 className="az-section-title">Data</h2></div>
        <div className="az-table-wrap">
          <table className="az-table">
            <thead>
              <tr><th>Service</th><th>Region</th><th>Status</th><th>p95</th><th>Owner</th><th></th></tr>
            </thead>
            <tbody>
              {[
                ["api-gateway", "lisbon", "Healthy", "42ms", "platform", "moss"],
                ["billing", "frankfurt", "Healthy", "118ms", "payments", "moss"],
                ["search-index", "n.virginia", "Throttled", "612ms", "data", "amber"],
                ["asset-cdn", "global", "Healthy", "12ms", "platform", "moss"],
                ["webhooks", "lisbon", "Down", "—", "platform", "coral"],
              ].map(([s, r, st, p, o, c]) => (
                <tr key={s}>
                  <td><span className="az-text-mono" style={{ fontSize: 13 }}>{s}</span></td>
                  <td style={{ color: "var(--az-text-3)" }}>{r}</td>
                  <td><span className={`az-badge az-badge--${c}`}><span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }}></span>{st}</span></td>
                  <td className="az-text-mono">{p}</td>
                  <td><span className="az-row"><span className="az-avatar az-avatar--sm" style={{ background: "var(--az-ocean-400)" }}>{o[0].toUpperCase()}</span>{o}</span></td>
                  <td style={{ textAlign: "right" }}><button className="az-btn az-btn--ghost az-btn--icon az-btn--sm"><Icon name="morev" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Modal open={modal} onClose={() => setModal(false)} title="Delete project?" footer={
        <>
          <button className="az-btn" onClick={() => setModal(false)}>Cancel</button>
          <button className="az-btn az-btn--danger" onClick={() => setModal(false)}>Delete project</button>
        </>
      }>
        <p style={{ margin: 0, color: "var(--az-text-2)" }}>
          This will permanently delete <strong>azores-prod</strong>, all its
          environments, deployments and logs. This action cannot be undone.
        </p>
      </Modal>

      <ToastStack toasts={toasts} />
    </div>
  );
}

window.ComponentsPage = ComponentsPage;
