import { useEffect, useState } from "react";
import { BrandMark, Button, Icon } from "@azores/ui";
import { Foundations } from "./pages/Foundations";
import { Components } from "./pages/Components";

type Route = "foundations" | "components";

const ROUTES: ReadonlyArray<{ id: Route; label: string; icon: string }> = [
  { id: "foundations", label: "Foundations", icon: "layers" },
  { id: "components", label: "Components", icon: "grid" },
];

const readRoute = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES.some((r) => r.id === hash) ? (hash as Route) : "foundations";
};

export const App = (): JSX.Element => {
  const [route, setRoute] = useState<Route>(readRoute);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const onHash = (): void => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navigate = (id: Route): void => {
    window.location.hash = `/${id}`;
  };

  const currentTitle = ROUTES.find((r) => r.id === route)?.label ?? "";

  return (
    <div className="az-app">
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
              onClick={() => navigate(r.id)}
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
          <span className="az-topbar-title">{currentTitle}</span>
          <span className="az-topbar-spacer" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} size={14} />
            {theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
        {route === "foundations" ? <Foundations /> : <Components />}
      </main>
    </div>
  );
};
