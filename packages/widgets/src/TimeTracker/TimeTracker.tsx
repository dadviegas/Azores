import { useEffect, useState } from "react";
import { getStorage } from "@azores/core";
import {
  Btn,
  Form,
  Input,
  List,
  Row,
  SmBtn,
  Time,
  Wrap,
} from "./TimeTracker.styles.js";

const KEY = "time-tracker:v1";
type Task = { id: string; label: string; total: number; startedAt: number | null };

const fmt = (ms: number): string => {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`
    : `${m}:${String(ss).padStart(2, "0")}`;
};

export const TimeTracker = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState("");
  const [, force] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Task[]>(KEY);
      if (cancelled) return;
      setTasks(Array.isArray(stored) ? stored : []);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void getStorage().set<Task[]>(KEY, tasks);
  }, [tasks, hydrated]);

  // Tick every second so the running task's display advances. The persisted
  // state only changes on start/stop; ticking forces re-render without
  // touching state.
  useEffect(() => {
    const id = window.setInterval(() => force((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!draft.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: `t${Date.now().toString(36)}`, label: draft.trim(), total: 0, startedAt: null },
    ]);
    setDraft("");
  };

  const toggle = (id: string): void =>
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.startedAt == null) return { ...t, startedAt: Date.now() };
        return { ...t, total: t.total + (Date.now() - t.startedAt), startedAt: null };
      }),
    );

  const display = (t: Task): number =>
    t.startedAt ? t.total + (Date.now() - t.startedAt) : t.total;

  return (
    <Wrap>
      <Form onSubmit={submit}>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="New task…"
          aria-label="New task"
        />
        <Btn type="submit">Add</Btn>
      </Form>
      <List>
        {tasks.map((t) => (
          <Row key={t.id} $running={t.startedAt != null}>
            <span>{t.label}</span>
            <Time>{fmt(display(t))}</Time>
            <SmBtn onClick={() => toggle(t.id)}>{t.startedAt ? "Stop" : "Start"}</SmBtn>
            <SmBtn onClick={() => setTasks((prev) => prev.filter((x) => x.id !== t.id))}>×</SmBtn>
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default TimeTracker;
