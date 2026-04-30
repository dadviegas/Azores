// Azores — Login screen
const { useState: uSL } = React;

function LoginPage({ onLogin }) {
  const [email, setEmail] = uSL("");
  const [pass, setPass] = uSL("");
  const [loading, setLoading] = uSL(false);

  const submit = (e) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin?.({ email: email || "catarina@azores.dev" }); }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "var(--az-bg)",
    }}>
      {/* Left — form */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 80px", maxWidth: 520, width: "100%", margin: "0 auto" }}>
        <div className="az-brand" style={{ borderBottom: "none", padding: 0, marginBottom: 48 }}>
          <div className="az-brand-mark">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 11 Q 5 8 8 11 T 14 11" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M2 8 Q 5 5 8 8 T 14 8" stroke="white" strokeWidth="1.5" opacity="0.6" fill="none" />
            </svg>
          </div>
          <div>
            <div className="az-brand-name">Azores</div>
            <div className="az-brand-tag">DESIGN SYSTEM</div>
          </div>
        </div>

        <div className="az-page-eyebrow">WELCOME BACK</div>
        <h1 className="az-page-title" style={{ fontSize: 40, marginBottom: 12 }}>Sign in to your console.</h1>
        <p style={{ color: "var(--az-text-2)", margin: "0 0 36px", fontSize: 15 }}>
          Continue with email or your SSO provider. We'll remember this device for 30 days.
        </p>

        <form onSubmit={submit} className="az-stack" style={{ gap: 14 }}>
          <div className="az-row" style={{ gap: 8 }}>
            <button type="button" className="az-btn" style={{ flex: 1, height: 40 }}><Icon name="git" size={14} />GitHub</button>
            <button type="button" className="az-btn" style={{ flex: 1, height: 40 }}><Icon name="globe" size={14} />Google</button>
            <button type="button" className="az-btn" style={{ flex: 1, height: 40 }}><Icon name="key" size={14} />SSO</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0", color: "var(--az-text-3)", fontSize: 11, letterSpacing: "0.1em" }}>
            <div style={{ flex: 1, height: 1, background: "var(--az-line)" }}></div>
            OR CONTINUE WITH EMAIL
            <div style={{ flex: 1, height: 1, background: "var(--az-line)" }}></div>
          </div>

          <div className="az-field">
            <label className="az-label">Email</label>
            <div className="az-input-group">
              <span className="az-input-group-addon"><Icon name="mail" size={14} /></span>
              <input className="az-input" type="email" placeholder="you@azores.dev" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
            </div>
          </div>

          <div className="az-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label className="az-label">Password</label>
              <a href="#" style={{ fontSize: 12, color: "var(--az-primary)", textDecoration: "none" }}>Forgot?</a>
            </div>
            <div className="az-input-group">
              <span className="az-input-group-addon"><Icon name="lock" size={14} /></span>
              <input className="az-input" type="password" placeholder="••••••••••••" value={pass} onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>

          <label className="az-check" style={{ marginTop: 4 }}>
            <input type="checkbox" defaultChecked /> Keep me signed in for 30 days
          </label>

          <button type="submit" className="az-btn az-btn--primary az-btn--lg" style={{ marginTop: 8 }} disabled={loading}>
            {loading ? <><span className="az-spinner" style={{ borderTopColor: "var(--az-bg)" }}></span> Signing in…</> : <>Sign in <Icon name="arrowright" size={14} /></>}
          </button>

          <div style={{ textAlign: "center", fontSize: 13, color: "var(--az-text-3)", marginTop: 12 }}>
            New to Azores? <a href="#" style={{ color: "var(--az-primary)", textDecoration: "none", fontWeight: 500 }}>Create an account →</a>
          </div>
        </form>

        <div style={{ marginTop: "auto", paddingTop: 40, fontSize: 11, color: "var(--az-text-3)", display: "flex", gap: 16 }}>
          <span>© 2026 Azores Cloud, S.A.</span>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Status</a>
        </div>
      </div>

      {/* Right — visual */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse 80% 60% at 30% 30%, rgba(15, 76, 117, 0.18), transparent 60%),
          radial-gradient(ellipse 60% 50% at 70% 70%, rgba(213, 88, 42, 0.16), transparent 60%),
          radial-gradient(ellipse 50% 40% at 50% 50%, rgba(217, 164, 65, 0.10), transparent 70%),
          linear-gradient(135deg, #0F2230 0%, #0B1620 100%)`,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 48,
      }}>
        {/* Topo overlay */}
        <svg viewBox="0 0 600 600" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
          <g fill="none" stroke="white" strokeWidth="1">
            <path d="M0 300 Q 150 220 300 290 T 600 270" />
            <path d="M0 340 Q 150 260 300 330 T 600 310" />
            <path d="M0 380 Q 150 300 300 370 T 600 350" />
            <path d="M0 260 Q 150 180 300 250 T 600 230" />
            <path d="M0 220 Q 150 140 300 210 T 600 190" />
            <path d="M0 420 Q 150 340 300 410 T 600 390" />
            <path d="M0 180 Q 150 100 300 170 T 600 150" />
          </g>
          <g fill="none" stroke="#E07B53" strokeWidth="1.5" opacity="0.6">
            <circle cx="380" cy="280" r="40" />
            <circle cx="380" cy="280" r="80" />
            <circle cx="380" cy="280" r="130" />
          </g>
        </svg>

        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "var(--az-font-mono)", fontSize: 11, letterSpacing: "0.1em", opacity: 0.7 }}>
            37.7°N · 25.4°W · ATLANTIC
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3].map(i => <div key={i} style={{ width: 24, height: 2, background: i === 0 ? "white" : "rgba(255,255,255,0.2)" }}></div>)}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "var(--az-font-display)", fontSize: 64, fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Build at the<br />edge of the<br />Atlantic.
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.5, opacity: 0.75, maxWidth: 440, margin: 0 }}>
            Azores is a low-latency cloud platform for engineering teams who care about
            craft, reliability, and the feel of the tools they ship every day.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 32, fontFamily: "var(--az-font-mono)", fontSize: 11 }}>
          {[
            ["UPTIME", "99.997%"],
            ["REGIONS", "14"],
            ["P99 LATENCY", "32ms"],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ opacity: 0.5, letterSpacing: "0.1em", marginBottom: 4 }}>{k}</div>
              <div style={{ fontFamily: "var(--az-font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.01em" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.LoginPage = LoginPage;
