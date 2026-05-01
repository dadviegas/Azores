// Atlas — a small dashboard of live, no-key public-API widgets. Uses the
// shared `<Dashboard>` from `@azores/ux` so it matches the chrome,
// drag/resize, and catalog behavior of the showcase dashboard. Difference
// from the showcase: every widget body is a `React.lazy` thunk from the
// `@azores/widgets` registry, and the data layer (DataProvider + Fetcher)
// is what makes the widgets light up.

import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Background,
  BrandMark,
  Button,
  Icon,
  LoadingShimmer,
  type BackgroundId,
} from "@azores/ui";
import {
  Dashboard,
  Drawer,
  TweaksPanel,
  useTweaks,
  type DashboardWidget,
} from "@azores/ux";
import { DataProvider } from "@azores/dataprovider";
import {
  collectAllowedSources,
  widgetRegistry,
  type WidgetEntry,
} from "@azores/widgets";

type Widget = DashboardWidget<unknown>;

const sources = collectAllowedSources();

const initial = (): Widget[] =>
  Object.entries(widgetRegistry).map(([id, entry]) => ({
    id: `w-${id}`,
    type: id,
    w: entry.manifest.defaultSize.w,
    h: entry.manifest.defaultSize.h,
    // No data payload for live widgets — they fetch via useSource.
  }));

const useResponsiveCols = (): number => {
  const [cols, setCols] = useState<number>(() => {
    if (typeof window === "undefined") return 12;
    if (window.matchMedia("(max-width: 480px)").matches) return 4;
    if (window.matchMedia("(max-width: 1024px)").matches) return 8;
    return 12;
  });
  useEffect(() => {
    const sm = window.matchMedia("(max-width: 480px)");
    const md = window.matchMedia("(max-width: 1024px)");
    const update = (): void => setCols(sm.matches ? 4 : md.matches ? 8 : 12);
    sm.addEventListener("change", update);
    md.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);
  return cols;
};

const WidgetSkeleton = (): JSX.Element => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%" }}>
    <LoadingShimmer style={{ height: 24, width: "55%" }} />
    <LoadingShimmer style={{ height: 14, width: "30%" }} />
    <LoadingShimmer style={{ flex: 1, minHeight: 60 }} />
  </div>
);

const renderBody = (widget: Widget): ReactNode => {
  const entry: WidgetEntry | undefined = widgetRegistry[widget.type];
  if (!entry) return <span style={{ color: "var(--az-text-3)" }}>Unknown widget</span>;
  const { Component, ttlMs } = entry;
  return (
    <Suspense fallback={<WidgetSkeleton />}>
      <Component ttlMs={ttlMs} />
    </Suspense>
  );
};

const BG: BackgroundId = "atlantic";

const makeFromCatalog = (id: string, entry: WidgetEntry): Widget => ({
  id: `w${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  type: id,
  w: entry.manifest.defaultSize.w,
  h: entry.manifest.defaultSize.h,
});

export const AtlasPage = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>(initial);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const cols = useResponsiveCols();
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const navigate = useNavigate();

  const remove = (id: string): void =>
    setWidgets((prev) => prev.filter((w) => w.id !== id));

  const addFromCatalog = (id: string): void => {
    const entry = widgetRegistry[id];
    if (!entry) return;
    setWidgets((prev) => [...prev, makeFromCatalog(id, entry)]);
  };

  const reset = (): void => setWidgets(initial());

  const dragEntry = dragId ? widgetRegistry[dragId] : null;

  return (
    <DataProvider sources={sources}>
      <div style={{ position: "relative", minHeight: "100dvh", isolation: "isolate" }}>
        <Background variant={BG} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
        <div
          className="az-content"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1180,
            margin: "0 auto",
            padding: "32px 24px",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <Link
              to="/"
              aria-label="Back to home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <BrandMark size="md" />
              <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>Atlas</span>
            </Link>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                aria-label="Back to home"
              >
                <Icon name="home" size={14} />
                Home
              </Button>
              <Button variant="primary" size="sm" onClick={() => setLibOpen(true)}>
                <Icon name="plus" size={14} />
                Add widget
              </Button>
              <Button variant="ghost" size="sm" onClick={reset}>
                <Icon name="refresh" size={14} />
                Reset
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleTheme()}
                aria-label={`Switch to ${tweaks.theme === "dark" ? "light" : "dark"} theme`}
                title="Toggle theme"
              >
                <Icon name={tweaks.theme === "dark" ? "sun" : "moon"} size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTweaksOpen(true)}
                aria-label="Open tweaks"
              >
                <Icon name="settings" size={14} />
                Tweaks
              </Button>
            </div>
          </header>

          <div style={{ marginBottom: 24 }}>
            <div className="az-page-eyebrow">ATLAS · LIVE DATA</div>
            <h1 className="az-page-title" style={{ marginBottom: 6 }}>
              The world, on a slow drip.
            </h1>
            <p style={{ color: "var(--az-text-2)", margin: 0, fontSize: 15 }}>
              Weather you can dress for, a country you've never heard of, a Wikipedia
              rabbit-hole, and rates that make your euros feel something. Drag tiles
              around — IndexedDB remembers, even if you don't.
            </p>
          </div>

          <Dashboard<unknown>
            widgets={widgets}
            onChange={setWidgets}
            cols={cols}
            minWidth={Math.min(2, cols)}
            externalDrag={
              dragEntry
                ? {
                    w: dragEntry.manifest.defaultSize.w,
                    h: dragEntry.manifest.defaultSize.h,
                    onDrop: () => {
                      if (dragId) addFromCatalog(dragId);
                      setDragId(null);
                    },
                  }
                : null
            }
            renderTitle={(w) => widgetRegistry[w.type]?.manifest.title ?? w.type}
            renderBody={({ widget }) => renderBody(widget)}
            widgetActions={(w) => [
              {
                id: "remove",
                icon: "x",
                label: "Remove widget",
                onClick: () => remove(w.id),
              },
            ]}
          />
        </div>

        <Drawer
          open={libOpen}
          onClose={() => setLibOpen(false)}
          side="right"
          width="340px"
          title="Widget library"
          showBackdrop={false}
        >
          <p style={{ margin: "0 0 16px", color: "var(--az-text-3)", fontSize: 12 }}>
            Drag onto the dashboard, or click to add.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(widgetRegistry).map(([id, entry]) => (
              <div
                key={id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = "copy";
                  e.dataTransfer.setData("application/x-az-widget", id);
                  setDragId(id);
                }}
                onDragEnd={() => setDragId(null)}
                onClick={() => {
                  addFromCatalog(id);
                  setLibOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  background: "var(--az-bg-2)",
                  border: "1px solid var(--az-line)",
                  borderRadius: 10,
                  cursor: "grab",
                  userSelect: "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: "grid",
                    placeItems: "center",
                    background: "var(--az-surface)",
                    border: "1px solid var(--az-line)",
                    borderRadius: 8,
                    color: "var(--az-text-2)",
                  }}
                >
                  <Icon name={entry.manifest.icon ?? "box"} size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{entry.manifest.title}</div>
                  <div style={{ fontSize: 11, color: "var(--az-text-3)" }}>
                    {entry.manifest.description ?? ""}
                  </div>
                </div>
                <Icon name="plus" size={14} style={{ color: "var(--az-text-3)" }} />
              </div>
            ))}
          </div>
        </Drawer>

        <TweaksPanel
          open={tweaksOpen}
          onClose={() => setTweaksOpen(false)}
          theme={tweaks.theme}
          accent={tweaks.accent}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
        />
      </div>
    </DataProvider>
  );
};
