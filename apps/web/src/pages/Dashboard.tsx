import { useEffect, useState, type ReactNode } from "react";
import { Background, Button, Icon, type BackgroundId } from "@azores/ui";
import { Dashboard, type DashboardWidget } from "@azores/ux";
import {
  CalendarWidget,
  ChartWidget,
  ClockWidget,
  KpiWidget,
  NotesWidget,
  TasksWidget,
  TeamWidget,
  type KpiData,
} from "./widgets";

type WidgetType = "kpi" | "chart" | "tasks" | "calendar" | "notes" | "clock" | "team";

type WidgetData = {
  kpi: KpiData;
  chart: undefined;
  tasks: undefined;
  calendar: undefined;
  notes: undefined;
  clock: undefined;
  team: undefined;
};

type Widget = DashboardWidget<WidgetData[WidgetType]>;

const TITLES: Record<WidgetType, string> = {
  kpi: "KPI",
  chart: "Chart",
  tasks: "Tasks",
  calendar: "Calendar",
  notes: "Notes",
  clock: "World clock",
  team: "Team",
};

const INITIAL: Widget[] = [
  {
    id: "w1",
    type: "kpi",
    w: 3,
    h: 1,
    data: { label: "MRR", value: "$284K", delta: "+12.4%", dir: "up" },
  },
  {
    id: "w2",
    type: "kpi",
    w: 3,
    h: 1,
    data: { label: "Active users", value: "12.8K", delta: "+8.1%", dir: "up" },
  },
  {
    id: "w3",
    type: "kpi",
    w: 3,
    h: 1,
    data: { label: "Churn", value: "1.2%", delta: "+0.1%", dir: "dn" },
  },
  {
    id: "w4",
    type: "kpi",
    w: 3,
    h: 1,
    data: { label: "NPS", value: "62", delta: "+4", dir: "up" },
  },
  { id: "w5", type: "chart", w: 6, h: 2 },
  { id: "w6", type: "tasks", w: 3, h: 2 },
  { id: "w7", type: "calendar", w: 3, h: 2 },
  { id: "w8", type: "notes", w: 4, h: 2 },
  { id: "w9", type: "clock", w: 4, h: 1 },
  { id: "w10", type: "team", w: 4, h: 1 },
];

const BG_OPTIONS: ReadonlyArray<{ id: BackgroundId | "paper"; name: string }> = [
  { id: "paper", name: "Paper" },
  { id: "atlantic", name: "Atlantic" },
  { id: "blueprint", name: "Blueprint" },
  { id: "fog", name: "Fog" },
  { id: "moss", name: "Moss" },
  { id: "basalt", name: "Basalt" },
];

const renderBody = (widget: Widget): ReactNode => {
  switch (widget.type as WidgetType) {
    case "kpi":
      return <KpiWidget data={widget.data as KpiData} />;
    case "chart":
      return <ChartWidget />;
    case "tasks":
      return <TasksWidget />;
    case "calendar":
      return <CalendarWidget />;
    case "notes":
      return <NotesWidget />;
    case "clock":
      return <ClockWidget />;
    case "team":
      return <TeamWidget />;
    default:
      return null;
  }
};

// Watch viewport, return responsive grid cols.
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

export const DashboardPage = (): JSX.Element => {
  const [widgets, setWidgets] = useState<Widget[]>(INITIAL);
  const [bg, setBg] = useState<BackgroundId | "paper">("paper");
  const cols = useResponsiveCols();

  const removeWidget = (id: string): void =>
    setWidgets((prev) => prev.filter((w) => w.id !== id));

  const reset = (): void => setWidgets(INITIAL);

  const content = (
    <div className="az-content" style={{ maxWidth: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 24,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="az-page-eyebrow">UX DASHBOARD</div>
          <h1 className="az-page-title" style={{ marginBottom: 6 }}>
            Good morning, Catarina.
          </h1>
          <p style={{ color: "var(--az-text-2)", margin: 0, fontSize: 15 }}>
            Drag a widget by its handle to reorder. Drag the bottom-right corner to resize.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              background: "var(--az-surface)",
              border: "1px solid var(--az-line)",
              borderRadius: 10,
            }}
            role="radiogroup"
            aria-label="Background"
          >
            {BG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                role="radio"
                aria-checked={bg === opt.id}
                title={opt.name}
                onClick={() => setBg(opt.id)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: 0,
                  border:
                    bg === opt.id ? "2px solid var(--az-primary)" : "1px solid var(--az-line)",
                  background:
                    opt.id === "paper"
                      ? "var(--az-bg)"
                      : "var(--az-surface)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {opt.id !== "paper" ? (
                  <Background
                    variant={opt.id}
                    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            <Icon name="refresh" size={14} />
            Reset layout
          </Button>
        </div>
      </div>

      <Dashboard<WidgetData[WidgetType]>
        widgets={widgets}
        onChange={setWidgets}
        cols={cols}
        minWidth={Math.min(2, cols)}
        renderTitle={(w) => TITLES[w.type as WidgetType] ?? w.type}
        renderBody={({ widget }) => renderBody(widget)}
        widgetActions={(w) => [
          {
            id: "remove",
            icon: "x",
            label: "Remove widget",
            onClick: () => removeWidget(w.id),
          },
        ]}
      />
    </div>
  );

  if (bg === "paper") return content;
  return (
    <div style={{ position: "relative", minHeight: "calc(100dvh - 56px)" }}>
      <Background
        variant={bg}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{content}</div>
    </div>
  );
};
