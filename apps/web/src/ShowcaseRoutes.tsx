// Router-agnostic showcase. Mounts <Routes> using relative paths so the same
// component works whether it's at the root of a BrowserRouter (standalone
// `apps/web` deploy) or nested under a parent route in a host shell (Module
// Federation consumer like `apps/home`). The host owns the BrowserRouter.

import { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useResolvedPath,
  Navigate,
} from "react-router-dom";
import { BrandMark, Button, Icon, Kbd } from "@azores/ui";
import {
  CommandPalette,
  ToastProvider,
  TweaksPanel,
  useToast,
  useTweaks,
  type Command,
} from "@azores/ux";
import { Foundations } from "./pages/Foundations";
import { Components } from "./pages/Components";
import { DashboardPage } from "./pages/Dashboard";
import { Markdown } from "./pages/Markdown";
import { Icons } from "./pages/Icons";
import { LoginPage } from "./pages/Login";

type RouteEntry = { path: string; label: string; icon: string };

// Paths are relative — react-router resolves them against whatever path the
// host mounted us at. NavLink's `to` is also relative.
const ROUTES: ReadonlyArray<RouteEntry> = [
  { path: "foundations", label: "Foundations", icon: "layers" },
  { path: "components", label: "Components", icon: "grid" },
  { path: "icons", label: "Icons", icon: "sparkles" },
  { path: "dashboard", label: "UX dashboard", icon: "dashboard" },
  { path: "markdown", label: "Markdown", icon: "bookopen" },
  { path: "login", label: "Login", icon: "user" },
];

const ShowcaseLayout = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const base = useResolvedPath(".").pathname;
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const toast = useToast();

  useEffect(() => {
    document.body.dataset.navOpen = navOpen ? "true" : "false";
  }, [navOpen]);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (slug: string) => () => navigate(slug);

  const commands = useMemo<ReadonlyArray<Command>>(
    () => [
      { id: "nav-home", label: "Back to home", group: "Navigate", icon: "home", run: () => navigate("/") },
      { id: "nav-found", label: "Go to Foundations", group: "Navigate", icon: "layers", run: go("foundations") },
      { id: "nav-comp", label: "Go to Components", group: "Navigate", icon: "grid", run: go("components") },
      { id: "nav-icons", label: "Go to Icons", group: "Navigate", icon: "sparkles", run: go("icons") },
      { id: "nav-ux", label: "Go to UX dashboard", group: "Navigate", icon: "dashboard", run: go("dashboard") },
      { id: "nav-md", label: "Go to Markdown", group: "Navigate", icon: "bookopen", run: go("markdown") },
      { id: "nav-login", label: "Go to Login", group: "Navigate", icon: "user", run: go("login") },
      { id: "th-toggle", label: "Toggle theme", group: "Theme", icon: "settings", run: () => toggleTheme() },
      { id: "th-light", label: "Switch to Light theme", group: "Theme", icon: "sun", run: () => setTheme("light") },
      { id: "th-dark", label: "Switch to Dark theme", group: "Theme", icon: "moon", run: () => setTheme("dark") },
      { id: "ac-ocean", label: "Accent · Ocean", group: "Accent", icon: "droplet", run: () => setAccent("ocean") },
      { id: "ac-volcanic", label: "Accent · Volcanic", group: "Accent", icon: "flame", run: () => setAccent("volcanic") },
      { id: "ac-mono", label: "Accent · Mono", group: "Accent", icon: "moreh", run: () => setAccent("mono") },
      { id: "ac-violet", label: "Accent · Violet", group: "Accent", icon: "sparkles", run: () => setAccent("violet") },
      { id: "open-tweaks", label: "Open Tweaks panel", group: "Showcase", icon: "settings", run: () => setTweaksOpen(true) },
      {
        id: "demo-toast",
        label: "Fire a sample toast",
        group: "Showcase",
        icon: "bell",
        run: () =>
          toast.push({ kind: "success", title: "Saved", message: "Tweaks persisted to localStorage." }),
      },
    ],
    [navigate, setAccent, setTheme, toggleTheme, toast],
  );

  const currentTitle =
    ROUTES.find((r) => location.pathname === `${base.replace(/\/$/, "")}/${r.path}`)?.label ?? "";

  return (
    <div className="az-app">
      <div className="az-sidebar-backdrop" aria-hidden="true" onClick={() => setNavOpen(false)} />
      <aside className="az-sidebar">
        <Link
          to="/"
          className="az-brand"
          aria-label="Back to home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <BrandMark size="md" />
          <div>
            <div className="az-brand-name">Azores</div>
            <div className="az-brand-tag">Design system</div>
          </div>
        </Link>
        <nav className="az-nav" aria-label="Showcase navigation">
          <div className="az-nav-section">Showcase</div>
          {ROUTES.map((r) => (
            <NavLink
              key={r.path}
              to={r.path}
              className={({ isActive }: { isActive: boolean }) =>
                `az-nav-item${isActive ? " is-active" : ""}`
              }
            >
              <Icon name={r.icon} size={16} />
              {r.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="az-main">
        <div className="az-topbar">
          <button
            className="az-burger"
            type="button"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((o) => !o)}
          >
            <Icon name={navOpen ? "x" : "menu"} size={18} />
          </button>
          <span className="az-topbar-brand" aria-hidden="true">
            <BrandMark size="sm" />
          </span>
          <span className="az-topbar-title">{currentTitle}</span>
          <span className="az-topbar-spacer" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            aria-label="Back to home"
          >
            <Icon name="home" size={14} />
            <span className="az-topbar-btn-label">Home</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setPaletteOpen(true)}>
            <Icon name="search" size={14} />
            <span className="az-topbar-btn-label">
              Commands <Kbd>⌘K</Kbd>
            </span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setTweaksOpen(true)} aria-label="Open tweaks">
            <Icon name="settings" size={14} />
            <span className="az-topbar-btn-label">Tweaks</span>
          </Button>
        </div>
        <Outlet />
      </main>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        theme={tweaks.theme}
        accent={tweaks.accent}
        onThemeChange={setTheme}
        onAccentChange={setAccent}
      />
    </div>
  );
};

const LoginRoute = (): JSX.Element => (
  <ToastProvider>
    <LoginPage />
  </ToastProvider>
);

// The default export is what the federated remote ships. ToastProvider is
// included here so consumers don't have to know about it; it's a leaf-level
// concern of the showcase.
export const ShowcaseRoutes = (): JSX.Element => (
  <ToastProvider>
    <Routes>
      <Route path="login" element={<LoginRoute />} />
      <Route element={<ShowcaseLayout />}>
        <Route index element={<Navigate to="foundations" replace />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="components" element={<Components />} />
        <Route path="icons" element={<Icons />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="markdown" element={<Markdown />} />
        <Route path="*" element={<Navigate to="foundations" replace />} />
      </Route>
    </Routes>
  </ToastProvider>
);

export default ShowcaseRoutes;
