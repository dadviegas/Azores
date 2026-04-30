import { useEffect, useMemo, useState } from "react";
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

type Route = "foundations" | "components" | "ux" | "markdown" | "icons";

const ROUTES: ReadonlyArray<{ id: Route; label: string; icon: string }> = [
  { id: "foundations", label: "Foundations", icon: "layers" },
  { id: "components", label: "Components", icon: "grid" },
  { id: "icons", label: "Icons", icon: "sparkles" },
  { id: "ux", label: "UX dashboard", icon: "dashboard" },
  { id: "markdown", label: "Markdown", icon: "bookopen" },
];

const readRoute = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES.some((r) => r.id === hash) ? (hash as Route) : "foundations";
};

const navigateTo = (id: Route): void => {
  window.location.hash = `/${id}`;
};

const Shell = (): JSX.Element => {
  const [route, setRoute] = useState<Route>(readRoute);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const toast = useToast();

  useEffect(() => {
    const onHash = (): void => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.dataset.navOpen = navOpen ? "true" : "false";
  }, [navOpen]);

  // Close mobile nav whenever route changes
  useEffect(() => {
    setNavOpen(false);
  }, [route]);

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
        run: () => navigateTo("foundations"),
      },
      {
        id: "nav-comp",
        label: "Go to Components",
        group: "Navigate",
        icon: "grid",
        keywords: "buttons inputs badges",
        run: () => navigateTo("components"),
      },
      {
        id: "nav-icons",
        label: "Go to Icons",
        group: "Navigate",
        icon: "sparkles",
        keywords: "icon library glyphs",
        run: () => navigateTo("icons"),
      },
      {
        id: "nav-ux",
        label: "Go to UX dashboard",
        group: "Navigate",
        icon: "dashboard",
        keywords: "widgets drag resize",
        run: () => navigateTo("ux"),
      },
      {
        id: "nav-md",
        label: "Go to Markdown",
        group: "Navigate",
        icon: "bookopen",
        keywords: "docs editor blog",
        run: () => navigateTo("markdown"),
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
    [setAccent, setTheme, toggleTheme, toast],
  );

  const currentTitle = ROUTES.find((r) => r.id === route)?.label ?? "";

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
            <button
              key={r.id}
              className={`az-nav-item${route === r.id ? " is-active" : ""}`}
              onClick={() => navigateTo(r.id)}
              aria-current={route === r.id ? "page" : undefined}
            >
              <Icon name={r.icon} size={16} />
              {r.label}
            </button>
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
        {route === "foundations" ? (
          <Foundations />
        ) : route === "components" ? (
          <Components />
        ) : route === "icons" ? (
          <Icons />
        ) : route === "ux" ? (
          <DashboardPage />
        ) : (
          <Markdown />
        )}
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

export const App = (): JSX.Element => (
  <ToastProvider>
    <Shell />
  </ToastProvider>
);
