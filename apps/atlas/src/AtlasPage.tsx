// Atlas — a small dashboard of live, no-key public-API widgets. Uses the
// shared `<Dashboard>` from `@azores/ux` so it matches the chrome,
// drag/resize, and catalog behavior of the showcase dashboard. Difference
// from the showcase: every widget body is a `React.lazy` thunk from the
// `@azores/widgets` registry, and the data layer (DataProvider + Fetcher)
// is what makes the widgets light up.

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
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
  findFirstGap,
  packWidgets,
  useTweaks,
  type DashboardWidget,
} from "@azores/ux";
import { DataProvider } from "@azores/dataprovider";
import {
  collectAllowedSources,
  widgetCatalog,
  widgetRegistry,
  type CatalogEntry,
  type WidgetEntry,
} from "@azores/widgets";
import { getStorage } from "@azores/core";

type Widget = DashboardWidget<unknown>;

const sources = collectAllowedSources();

// Schema-versioned so a future shape change can be detected and discarded
// instead of crashing the dashboard. Bump `v` on any breaking field change.
const LAYOUT_KEY = "atlas:dashboard:layout";
const LAYOUT_VERSION = 1;
type StoredLayout = { v: number; widgets: Widget[] };

// `GridItem` is just `{id, w, h}` — column/row come from packing in
// declaration order. So the persisted shape mirrors `Widget` 1:1; the array
// order is what encodes "where each tile goes".
const serializeWidgets = (widgets: Widget[]): Widget[] =>
  widgets.map(({ id, type, w, h, data }) => ({ id, type, w, h, data }));

const isValidLayout = (raw: unknown): raw is StoredLayout =>
  typeof raw === "object" &&
  raw !== null &&
  (raw as StoredLayout).v === LAYOUT_VERSION &&
  Array.isArray((raw as StoredLayout).widgets);

const initial = (): Widget[] =>
  widgetCatalog.map((entry) => ({
    id: `w-${entry.id}`,
    type: entry.type,
    w: entry.defaultSize.w,
    h: entry.defaultSize.h,
    data: entry.data,
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
      <Component ttlMs={ttlMs} data={widget.data} />
    </Suspense>
  );
};

const BG: BackgroundId = "atlantic";

// Size the new tile to fit the first existing gap when one exists, falling
// back to the manifest default. Floor of 2×2 matches the dashboard min so a
// shrunk tile isn't unusable.
const sizeForCatalog = (
  existing: ReadonlyArray<Widget>,
  cols: number,
  defaultW: number,
  defaultH: number,
): { w: number; h: number } => {
  const packed = packWidgets(existing, cols);
  const gap = findFirstGap(packed, cols, defaultW, defaultH, 2, 2);
  return gap ?? { w: defaultW, h: defaultH };
};

const makeFromCatalog = (
  entry: CatalogEntry,
  existing: ReadonlyArray<Widget>,
  cols: number,
): Widget => {
  const { w, h } = sizeForCatalog(
    existing,
    cols,
    entry.defaultSize.w,
    entry.defaultSize.h,
  );
  return {
    id: `w${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: entry.type,
    w,
    h,
    data: entry.data,
  };
};

export const AtlasPage = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>(initial);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [libOpen, setLibOpen] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const cols = useResponsiveCols();
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const navigate = useNavigate();

  // `hydrated` gates the save effect: don't persist the seed layout before
  // we've checked storage, otherwise an in-flight load loses to an immediate
  // save on first render.
  const hydrated = useRef(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const raw = await getStorage().get<StoredLayout>(LAYOUT_KEY);
      if (cancelled) return;
      if (isValidLayout(raw) && raw.widgets.length > 0) setWidgets(raw.widgets);
      hydrated.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    // Debounce: drag/resize fires `onChange` per pointermove. One write per
    // gesture is plenty, and matters more once the adapter is Supabase.
    const t = window.setTimeout(() => {
      void getStorage().set<StoredLayout>(LAYOUT_KEY, {
        v: LAYOUT_VERSION,
        widgets: serializeWidgets(widgets),
      });
    }, 250);
    return () => window.clearTimeout(t);
  }, [widgets]);

  const remove = (id: string): void =>
    setWidgets((prev) => prev.filter((w) => w.id !== id));

  const addFromCatalog = (catalogId: string): void => {
    const entry = widgetCatalog.find((c) => c.id === catalogId);
    if (!entry) return;
    // Append so first-fit packing slots the new widget into the first
    // existing gap that fits — `makeFromCatalog` already shrunk the size
    // to match an open pocket when one was available.
    setWidgets((prev) => [...prev, makeFromCatalog(entry, prev, cols)]);
  };

  // Configurable widgets (presets carry a `data` payload) can have multiple
  // instances on the dashboard, so we never mark them "added". Fixed widgets
  // are blocked once their type is on the dashboard.
  const addedTypes = new Set(widgets.map((w) => w.type));
  const isAdded = (entry: CatalogEntry): boolean =>
    entry.data === undefined && addedTypes.has(entry.type);

  const reset = (): void => {
    setWidgets(initial());
    void getStorage().delete(LAYOUT_KEY);
  };

  const dragEntry = dragId
    ? widgetCatalog.find((c) => c.id === dragId) ?? null
    : null;

  return (
    <DataProvider sources={sources}>
      <div style={{ position: "relative", minHeight: "100dvh", isolation: "isolate" }}>
        {/* Fixed (not absolute) so the backdrop always covers the viewport — */}
        {/* during drag the Shell can briefly grow past 100dvh and an absolute */}
        {/* inset:0 then leaves a gap beneath the page bottom. */}
        <Background variant={BG} style={{ position: "fixed", inset: 0, zIndex: 0 }} />
        <div
          className="az-content"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1180,
            margin: "0 auto",
            padding: "32px clamp(16px, 4vw, 24px)",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              rowGap: 12,
              columnGap: 16,
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
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
            minHeight={1}
            externalDrag={
              dragEntry
                ? {
                    // Preview the actual size the widget will land at — if a
                    // smaller pocket is available, the ghost reflects it so
                    // the user isn't surprised on drop.
                    ...sizeForCatalog(
                      widgets,
                      cols,
                      dragEntry.defaultSize.w,
                      dragEntry.defaultSize.h,
                    ),
                    onDrop: () => {
                      if (dragId) addFromCatalog(dragId);
                      setDragId(null);
                    },
                  }
                : null
            }
            renderTitle={(w) => {
              // Configurable widgets (news presets) ship a `data.title` so
              // each instance reads as its source — "Reddit · r/worldnews"
              // rather than the generic manifest title "News feed".
              const dataTitle =
                w.data && typeof w.data === "object"
                  ? (w.data as { title?: unknown }).title
                  : undefined;
              if (typeof dataTitle === "string" && dataTitle.length > 0) {
                return dataTitle;
              }
              return widgetRegistry[w.type]?.manifest.title ?? w.type;
            }}
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
            Click to add to the top of the dashboard. Already-added widgets are marked.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {widgetCatalog.map((entry) => {
              const added = isAdded(entry);
              return (
                <div
                  key={entry.id}
                  draggable={!added}
                  onDragStart={(e) => {
                    if (added) {
                      e.preventDefault();
                      return;
                    }
                    e.dataTransfer.effectAllowed = "copy";
                    e.dataTransfer.setData("application/x-az-widget", entry.id);
                    setDragId(entry.id);
                  }}
                  onDragEnd={() => setDragId(null)}
                  onClick={() => {
                    if (added) return;
                    addFromCatalog(entry.id);
                    setLibOpen(false);
                  }}
                  aria-disabled={added}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: added ? "var(--az-bg-1)" : "var(--az-bg-2)",
                    border: `1px solid ${added ? "var(--az-line)" : "var(--az-line)"}`,
                    borderRadius: 10,
                    cursor: added ? "not-allowed" : "grab",
                    userSelect: "none",
                    opacity: added ? 0.55 : 1,
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
                    <Icon name={entry.icon ?? "box"} size={16} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{entry.title}</div>
                    <div style={{ fontSize: 11, color: "var(--az-text-3)" }}>
                      {added ? "Already on dashboard" : entry.description ?? ""}
                    </div>
                  </div>
                  <Icon
                    name={added ? "check" : "plus"}
                    size={14}
                    style={{ color: added ? "var(--az-primary)" : "var(--az-text-3)" }}
                  />
                </div>
              );
            })}
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
