import { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
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

const ROUTES: ReadonlyArray<RouteEntry> = [
  { path: "/foundations", label: "Foundations", icon: "layers" },
  { path: "/components", label: "Components", icon: "grid" },
  { path: "/icons", label: "Icons", icon: "sparkles" },
  { path: "/dashboard", label: "UX dashboard", icon: "dashboard" },
  { path: "/markdown", label: "Markdown", icon: "bookopen" },
  { path: "/login", label: "Login", icon: "user" },
];

const ShowcaseLayout = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const commands = useMemo<ReadonlyArray<Command>>(
    () => [
      {
        id: "nav-found",
        label: "Go to Foundations",
        group: "Navigate",
        icon: "layers",
        keywords: "color type tokens spacing radii",
        run: () => navigate("/foundations"),
      },
      {
        id: "nav-comp",
        label: "Go to Components",
        group: "Navigate",
        icon: "grid",
        keywords: "buttons inputs badges",
        run: () => navigate("/components"),
      },
      {
        id: "nav-icons",
        label: "Go to Icons",
        group: "Navigate",
        icon: "sparkles",
        keywords: "icon library glyphs",
        run: () => navigate("/icons"),
      },
      {
        id: "nav-ux",
        label: "Go to UX dashboard",
        group: "Navigate",
        icon: "dashboard",
        keywords: "widgets drag resize",
        run: () => navigate("/dashboard"),
      },
      {
        id: "nav-md",
        label: "Go to Markdown",
        group: "Navigate",
        icon: "bookopen",
        keywords: "docs editor blog",
        run: () => navigate("/markdown"),
      },
      {
        id: "nav-login",
        label: "Go to Login",
        group: "Navigate",
        icon: "user",
        keywords: "sign in auth",
        run: () => navigate("/login"),
      },
      {
        id: "th-toggle",
        label: "Toggle theme",
        group: "Theme",
        icon: "settings",
        keywords: "light dark",
        run: () => toggleTheme(),
      },
      {
        id: "th-light",
        label: "Switch to Light theme",
        group: "Theme",
        icon: "sun",
        run: () => setTheme("light"),
      },
      {
        id: "th-dark",
        label: "Switch to Dark theme",
        group: "Theme",
        icon: "moon",
        run: () => setTheme("dark"),
      },
      {
        id: "ac-ocean",
        label: "Accent · Ocean",
        group: "Accent",
        icon: "droplet",
        run: () => setAccent("ocean"),
      },
      {
        id: "ac-volcanic",
        label: "Accent · Volcanic",
        group: "Accent",
        icon: "flame",
        run: () => setAccent("volcanic"),
      },
      {
        id: "ac-mono",
        label: "Accent · Mono",
        group: "Accent",
        icon: "moreh",
        run: () => setAccent("mono"),
      },
      {
        id: "ac-violet",
        label: "Accent · Violet",
        group: "Accent",
        icon: "sparkles",
        run: () => setAccent("violet"),
      },
      {
        id: "open-tweaks",
        label: "Open Tweaks panel",
        group: "Showcase",
        icon: "settings",
        run: () => setTweaksOpen(true),
      },
      {
        id: "demo-toast",
        label: "Fire a sample toast",
        group: "Showcase",
        icon: "bell",
        keywords: "notification",
        run: () =>
          toast.push({
            kind: "success",
            title: "Saved",
            message: "Tweaks persisted to localStorage.",
          }),
      },
    ],
    [navigate, setAccent, setTheme, toggleTheme, toast],
  );

  const currentTitle =
    ROUTES.find((r) => r.path === location.pathname)?.label ?? "";

  return (
    <div className="az-app">
      <div
        className="az-sidebar-backdrop"
        aria-hidden="true"
        onClick={() => setNavOpen(false)}
      />
      <aside className="az-sidebar">
        <div className="az-brand">
          <BrandMark size="md" />
          <div>
            <div className="az-brand-name">Azores</div>
            <div className="az-brand-tag">Design system</div>
          </div>
        </div>
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
          <Button variant="ghost" size="sm" onClick={() => setPaletteOpen(true)}>
            <Icon name="search" size={14} />
            <span className="az-topbar-btn-label">
              Commands <Kbd>⌘K</Kbd>
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTweaksOpen(true)}
            aria-label="Open tweaks"
          >
            <Icon name="settings" size={14} />
            <span className="az-topbar-btn-label">Tweaks</span>
          </Button>
        </div>
        <Outlet />
      </main>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />
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

const LoginRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const toast = useToast();

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

  const commands = useMemo<ReadonlyArray<Command>>(
    () => [
      {
        id: "nav-found",
        label: "Go to Foundations",
        group: "Navigate",
        icon: "layers",
        run: () => navigate("/foundations"),
      },
      {
        id: "nav-comp",
        label: "Go to Components",
        group: "Navigate",
        icon: "grid",
        run: () => navigate("/components"),
      },
      {
        id: "nav-icons",
        label: "Go to Icons",
        group: "Navigate",
        icon: "sparkles",
        run: () => navigate("/icons"),
      },
      {
        id: "nav-ux",
        label: "Go to UX dashboard",
        group: "Navigate",
        icon: "dashboard",
        run: () => navigate("/dashboard"),
      },
      {
        id: "nav-md",
        label: "Go to Markdown",
        group: "Navigate",
        icon: "bookopen",
        run: () => navigate("/markdown"),
      },
      {
        id: "th-toggle",
        label: "Toggle theme",
        group: "Theme",
        icon: "settings",
        run: () => toggleTheme(),
      },
      {
        id: "open-tweaks",
        label: "Open Tweaks panel",
        group: "Showcase",
        icon: "settings",
        run: () => setTweaksOpen(true),
      },
      {
        id: "demo-toast",
        label: "Fire a sample toast",
        group: "Showcase",
        icon: "bell",
        run: () =>
          toast.push({
            kind: "success",
            title: "Saved",
            message: "Tweaks persisted to localStorage.",
          }),
      },
    ],
    [navigate, setTheme, toggleTheme, toast],
  );

  return (
    <>
      <LoginPage />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        commands={commands}
      />
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        theme={tweaks.theme}
        accent={tweaks.accent}
        onThemeChange={setTheme}
        onAccentChange={setAccent}
      />
    </>
  );
};

export const App = (): JSX.Element => (
  <ToastProvider>
    <BrowserRouter basename={__AZORES_BASE_PATH__}>
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route element={<ShowcaseLayout />}>
          <Route index element={<Navigate to="/foundations" replace />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="/components" element={<Components />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/markdown" element={<Markdown />} />
          <Route path="*" element={<Navigate to="/foundations" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ToastProvider>
);
