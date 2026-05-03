// Atlas — a small dashboard of live, no-key public-API widgets. Uses the
// shared `<Dashboard>` from `@azores/ux` so it matches the chrome,
// drag/resize, and catalog behavior of the showcase dashboard. Difference
// from the showcase: every widget body is a `React.lazy` thunk from the
// `@azores/widgets` registry, and the data layer (DataProvider + Fetcher)
// is what makes the widgets light up.

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  tidyWidgets,
  useAiSettings,
  useTweaks,
  type DashboardWidget,
} from "@azores/ux";
import { DataProvider } from "@azores/dataprovider";
import {
  collectAllowedSources,
  widgetCatalog,
  widgetRegistry,
  WIDGET_CATEGORY_ORDER,
  type CatalogEntry,
  type WidgetCategory,
  type WidgetEntry,
} from "@azores/widgets";
import { getStorage } from "@azores/core";

type Widget = DashboardWidget<unknown>;

const sources = collectAllowedSources();

// Schema-versioned so a future shape change can be detected and discarded
// instead of crashing the dashboard. Bump `v` on any breaking field change.
// v2: Reddit and Wikinews presets removed from the seed (browsers can no
// longer fetch them cross-origin); existing v1 layouts are discarded so
// the saved widget URLs don't keep surfacing "Load failed" tiles.
const LAYOUT_KEY = "atlas:dashboard:layout";
// v4: widgets gained optional `col`/`row` pins so users can drop tiles
// anywhere on the grid; the seed remains unpinned (tidy) so existing
// dashboards re-pack normally on load. Bumping discards v3 layouts so
// saved arrays don't carry stale widget IDs from before the recent batch
// of new widgets.
const LAYOUT_VERSION = 4;
type StoredLayout = { v: number; widgets: Widget[] };

// Persist the optional pin coordinates alongside the rest of the widget so
// drop-where-you-want survives reload. Anything else stays implicit.
const serializeWidgets = (widgets: Widget[]): Widget[] =>
  widgets.map(({ id, type, w, h, data, col, row }) => ({
    id,
    type,
    w,
    h,
    data,
    ...(col != null ? { col } : {}),
    ...(row != null ? { row } : {}),
  }));

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

// Pick a column count that keeps each cell roughly square at a comfortable
// physical size. The dashboard renders square cells (rowH = column width), so
// more columns on a wide screen means more widgets per row, not bigger gaps.
const colsForWidth = (w: number): number => {
  if (w <= 480) return 4;
  if (w <= 1024) return 8;
  if (w <= 1440) return 12;
  if (w <= 1920) return 16;
  if (w <= 2560) return 20;
  return 24;
};

const useResponsiveCols = (): number => {
  const [cols, setCols] = useState<number>(() =>
    typeof window === "undefined" ? 12 : colsForWidth(window.innerWidth),
  );
  useEffect(() => {
    const update = (): void => setCols(colsForWidth(window.innerWidth));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
  const [libQuery, setLibQuery] = useState("");
  const [previewId, setPreviewId] = useState<string | null>(null);
  const cols = useResponsiveCols();
  const { tweaks, setTheme, setAccent, toggleTheme } = useTweaks();
  const { settings: aiSettings, setApiUrl, setApiKey, setModel } = useAiSettings();
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

  const addFromCatalog = (
    catalogId: string,
    cell?: { col: number; row: number },
  ): void => {
    const entry = widgetCatalog.find((c) => c.id === catalogId);
    if (!entry) return;
    setWidgets((prev) => {
      const fresh = makeFromCatalog(entry, prev, cols);
      // No drop coordinates (library click): leave the new widget unpinned
      // so first-fit packing slots it into the first open pocket.
      if (!cell) return [...prev, fresh];
      // Dropped on the grid: pin the new widget at the drop cell so it
      // lands exactly where the cursor was. The packer respects pins.
      return [...prev, { ...fresh, col: cell.col, row: cell.row }];
    });
  };

  const tidy = (): void => setWidgets((prev) => tidyWidgets(prev));

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

  const removeAll = (): void => setWidgets([]);

  // Filter library entries by free-text against title/description/category.
  // Empty query → full catalog. Trimmed + lowercased so the user doesn't
  // have to be precise.
  const filteredCatalog = useMemo(() => {
    const q = libQuery.trim().toLowerCase();
    if (!q) return widgetCatalog;
    return widgetCatalog.filter((e) => {
      const hay = `${e.title} ${e.description ?? ""} ${e.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [libQuery]);

  // Group filtered entries by category, preserving the canonical category
  // order so sections don't reshuffle as the search narrows.
  const groupedCatalog = useMemo(() => {
    const map = new Map<WidgetCategory, CatalogEntry[]>();
    for (const cat of WIDGET_CATEGORY_ORDER) map.set(cat, []);
    for (const entry of filteredCatalog) {
      const list = map.get(entry.category);
      if (list) list.push(entry);
      else map.set(entry.category, [entry]);
    }
    return [...map.entries()].filter(([, items]) => items.length > 0);
  }, [filteredCatalog]);

  // "Add all" inserts every visible (filtered) entry that isn't already on
  // the dashboard — fixed widgets are skipped if their type is added,
  // configurable presets are always allowed (they may co-exist).
  const addAllFiltered = (): void => {
    setWidgets((prev) => {
      let acc = prev;
      for (const entry of filteredCatalog) {
        if (entry.data === undefined && acc.some((w) => w.type === entry.type)) {
          continue;
        }
        acc = [...acc, makeFromCatalog(entry, acc, cols)];
      }
      return acc;
    });
  };

  const addableCount = filteredCatalog.filter(
    (e) => e.data !== undefined || !addedTypes.has(e.type),
  ).length;

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
            padding: "32px clamp(16px, 3vw, 32px)",
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
              <Button variant="ghost" size="sm" onClick={tidy} title="Re-pack tiles, clearing any drop pins">
                <Icon name="grid" size={14} />
                Tidy
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
                    onDrop: (cell) => {
                      if (dragId) addFromCatalog(dragId, cell);
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
          width="420px"
          title="Widget library"
          showBackdrop={false}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Icon
                name="search"
                size={14}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--az-text-3)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="search"
                value={libQuery}
                onChange={(e) => setLibQuery(e.target.value)}
                placeholder="Search widgets…"
                aria-label="Search widgets"
                style={{
                  width: "100%",
                  padding: "8px 10px 8px 32px",
                  background: "var(--az-bg-2)",
                  border: "1px solid var(--az-line)",
                  borderRadius: 10,
                  color: "var(--az-text-1)",
                  fontSize: 13,
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 11, color: "var(--az-text-3)" }}>
                {filteredCatalog.length} widget{filteredCatalog.length === 1 ? "" : "s"}
                {libQuery ? " matching" : ""}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addAllFiltered}
                  disabled={addableCount === 0}
                  title={
                    libQuery
                      ? `Add all ${addableCount} matching widgets`
                      : `Add all ${addableCount} widgets`
                  }
                >
                  <Icon name="plus" size={12} />
                  Add all{addableCount > 0 ? ` (${addableCount})` : ""}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeAll}
                  disabled={widgets.length === 0}
                  title="Remove every widget from the dashboard"
                >
                  <Icon name="trash" size={12} />
                  Remove all
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  title="Reset to the default seed layout"
                >
                  <Icon name="refresh" size={12} />
                  Reset
                </Button>
              </div>
            </div>

            {filteredCatalog.length === 0 ? (
              <div
                style={{
                  padding: "24px 12px",
                  textAlign: "center",
                  color: "var(--az-text-3)",
                  fontSize: 13,
                  background: "var(--az-bg-1)",
                  border: "1px dashed var(--az-line)",
                  borderRadius: 10,
                }}
              >
                No widgets match “{libQuery}”.
              </div>
            ) : (
              groupedCatalog.map(([category, items]) => (
                <div key={category} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 2px",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--az-text-3)",
                    }}
                  >
                    <span>{category}</span>
                    <span
                      aria-hidden
                      style={{ flex: 1, height: 1, background: "var(--az-line)" }}
                    />
                    <span>{items.length}</span>
                  </div>

                  {items.map((entry) => {
                    const added = isAdded(entry);
                    const expanded = previewId === entry.id;
                    const regEntry: WidgetEntry | undefined = widgetRegistry[entry.type];
                    return (
                      <div
                        key={entry.id}
                        style={{
                          background: "var(--az-bg-2)",
                          border: "1px solid var(--az-line)",
                          borderRadius: 10,
                          overflow: "hidden",
                          opacity: added ? 0.7 : 1,
                        }}
                      >
                        <div
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
                          onClick={() =>
                            setPreviewId((prev) => (prev === entry.id ? null : entry.id))
                          }
                          role="button"
                          tabIndex={0}
                          aria-expanded={expanded}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setPreviewId((prev) => (prev === entry.id ? null : entry.id));
                            }
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            cursor: added ? "default" : "grab",
                            userSelect: "none",
                          }}
                        >
                          <Icon
                            name={expanded ? "chevdown" : "chevright"}
                            size={12}
                            style={{ color: "var(--az-text-3)", flexShrink: 0 }}
                          />
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
                              flexShrink: 0,
                            }}
                          >
                            <Icon name={entry.icon ?? "box"} size={16} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {entry.title}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: "var(--az-text-3)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {added ? "Already on dashboard" : entry.description ?? ""}
                            </div>
                          </div>
                          <button
                            type="button"
                            disabled={added}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (added) return;
                              addFromCatalog(entry.id);
                            }}
                            aria-label={added ? "Already added" : `Add ${entry.title}`}
                            title={added ? "Already on dashboard" : "Add to dashboard"}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "5px 10px",
                              background: added ? "transparent" : "var(--az-surface)",
                              border: "1px solid var(--az-line)",
                              borderRadius: 8,
                              color: added ? "var(--az-primary)" : "var(--az-text-1)",
                              fontSize: 12,
                              cursor: added ? "default" : "pointer",
                              flexShrink: 0,
                            }}
                          >
                            <Icon name={added ? "check" : "plus"} size={12} />
                            {added ? "Added" : "Add"}
                          </button>
                        </div>

                        {expanded ? (
                          <div
                            style={{
                              borderTop: "1px solid var(--az-line)",
                              background: "var(--az-bg-1)",
                              padding: 10,
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                height: 220,
                                background: "var(--az-surface)",
                                border: "1px solid var(--az-line)",
                                borderRadius: 8,
                                padding: 12,
                                overflow: "hidden",
                              }}
                            >
                              {regEntry ? (
                                <Suspense fallback={<WidgetSkeleton />}>
                                  <regEntry.Component
                                    ttlMs={regEntry.ttlMs}
                                    data={entry.data}
                                  />
                                </Suspense>
                              ) : (
                                <span style={{ color: "var(--az-text-3)" }}>
                                  Preview unavailable
                                </span>
                              )}
                            </div>
                            <div
                              style={{
                                marginTop: 8,
                                fontSize: 11,
                                color: "var(--az-text-3)",
                                lineHeight: 1.5,
                              }}
                            >
                              {entry.description ?? "Live preview"} ·{" "}
                              <span>
                                Default size {entry.defaultSize.w}×{entry.defaultSize.h}
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </Drawer>

        <TweaksPanel
          open={tweaksOpen}
          onClose={() => setTweaksOpen(false)}
          theme={tweaks.theme}
          accent={tweaks.accent}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
          aiSettings={aiSettings}
          onAiUrlChange={setApiUrl}
          onAiKeyChange={setApiKey}
          onAiModelChange={setModel}
        />
      </div>
    </DataProvider>
  );
};
