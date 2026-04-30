// Widget renderers for the Dashboard showcase. App-specific demo content;
// these are not part of @azores/ux. Ported from
// docs/design/Azores/page-ux.jsx.

import { useState } from "react";
import { Avatar, Icon } from "@azores/ui";

export type KpiData = { label: string; value: string; delta: string; dir: "up" | "dn" };
export type CalendarEvent = { time: string; title: string; tone: "ocean" | "lava" | "moss" | "amber" };
export type ClockZone = { name: string; time: string };

export const KpiWidget = ({ data }: { data: KpiData }): JSX.Element => (
  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <div
      style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--az-text-3)",
        fontWeight: 500,
      }}
    >
      {data.label}
    </div>
    <div
      style={{
        fontFamily: "var(--az-font-display)",
        fontSize: 24,
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}
    >
      {data.value}
    </div>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 11,
        color: data.dir === "up" ? "var(--az-moss-500)" : "var(--az-coral-500)",
      }}
    >
      <Icon name={data.dir === "up" ? "arrowup" : "arrowdown"} size={10} />
      {data.delta}
    </div>
  </div>
);

const CHART_BARS = [62, 48, 75, 88, 70, 92, 78, 84];

export const ChartWidget = (): JSX.Element => {
  const max = Math.max(...CHART_BARS);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "var(--az-text-3)",
          marginBottom: 8,
        }}
      >
        <span>Weekly throughput</span>
        <span style={{ fontFamily: "var(--az-font-mono)" }}>+18%</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6, minHeight: 80 }}>
        {CHART_BARS.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / max) * 100}%`,
              background:
                i === CHART_BARS.length - 1 ? "var(--az-lava-400)" : "var(--az-ocean-400)",
              borderRadius: "3px 3px 0 0",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 6,
          fontSize: 10,
          color: "var(--az-text-3)",
          marginTop: 4,
          fontFamily: "var(--az-font-mono)",
        }}
      >
        {["M", "T", "W", "T", "F", "S", "S", "M"].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

type Task = { id: number; t: string; done: boolean };
const INITIAL_TASKS: Task[] = [
  { id: 1, t: "Review PR #284 — auth flow", done: true },
  { id: 2, t: "Q2 OKRs draft", done: false },
  { id: 3, t: "1:1 with Sara", done: false },
  { id: 4, t: "Ship pricing v2", done: false },
];

export const TasksWidget = (): JSX.Element => {
  const [items, setItems] = useState<Task[]>(INITIAL_TASKS);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((i) => (
        <label
          key={i.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "4px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          <input
            type="checkbox"
            checked={i.done}
            onChange={() =>
              setItems(items.map((x) => (x.id === i.id ? { ...x, done: !x.done } : x)))
            }
          />
          <span
            style={{
              flex: 1,
              textDecoration: i.done ? "line-through" : "none",
              color: i.done ? "var(--az-text-3)" : "var(--az-text)",
            }}
          >
            {i.t}
          </span>
        </label>
      ))}
    </div>
  );
};

const EVENTS: CalendarEvent[] = [
  { time: "09:00", title: "Standup", tone: "ocean" },
  { time: "10:30", title: "Design review", tone: "lava" },
  { time: "13:00", title: "Lunch w/ João", tone: "moss" },
  { time: "15:00", title: "All hands", tone: "amber" },
];

export const CalendarWidget = (): JSX.Element => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <div style={{ fontSize: 12, color: "var(--az-text-3)", marginBottom: 4 }}>
      Tuesday, April 30
    </div>
    {EVENTS.map((ev) => (
      <div
        key={ev.time}
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          padding: "6px 8px",
          background: "var(--az-bg-2)",
          borderRadius: 6,
          borderLeft: `3px solid var(--az-${ev.tone}-400)`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--az-font-mono)",
            fontSize: 11,
            color: "var(--az-text-3)",
            width: 40,
          }}
        >
          {ev.time}
        </span>
        <span style={{ fontSize: 13, flex: 1 }}>{ev.title}</span>
      </div>
    ))}
  </div>
);

export const NotesWidget = (): JSX.Element => (
  <textarea
    defaultValue={"Q2 priorities:\n1. Ship pricing v2\n2. Hire 2 engineers\n3. SOC 2 type II"}
    style={{
      width: "100%",
      height: "100%",
      minHeight: 0,
      border: "none",
      padding: 0,
      background: "transparent",
      fontSize: 13,
      lineHeight: 1.6,
      resize: "none",
      color: "inherit",
      fontFamily: "inherit",
      outline: "none",
    }}
  />
);

const ZONES: ClockZone[] = [
  { name: "Lisbon", time: "14:32" },
  { name: "New York", time: "09:32" },
  { name: "Tokyo", time: "22:32" },
];

export const ClockWidget = (): JSX.Element => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    {ZONES.map((z) => (
      <div
        key={z.name}
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          padding: "4px 0",
        }}
      >
        <span style={{ color: "var(--az-text-2)" }}>{z.name}</span>
        <span style={{ fontFamily: "var(--az-font-mono)", fontWeight: 600 }}>{z.time}</span>
      </div>
    ))}
  </div>
);

const TEAM: ReadonlyArray<{ initials: string; tone: string; online: boolean }> = [
  { initials: "CR", tone: "ocean-500", online: true },
  { initials: "JM", tone: "lava-400", online: true },
  { initials: "SP", tone: "moss-500", online: false },
  { initials: "AT", tone: "amber-500", online: true },
];

export const TeamWidget = (): JSX.Element => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ fontSize: 12, color: "var(--az-text-3)" }}>3 of 4 online</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {TEAM.map((m) => (
        <div key={m.initials} style={{ position: "relative" }}>
          <Avatar
            size="sm"
            style={{ background: `var(--az-${m.tone})`, opacity: m.online ? 1 : 0.4 }}
          >
            {m.initials}
          </Avatar>
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 9,
              height: 9,
              borderRadius: 999,
              background: m.online ? "var(--az-moss-500)" : "var(--az-line-2)",
              border: "2px solid var(--az-surface)",
            }}
          />
        </div>
      ))}
    </div>
  </div>
);
