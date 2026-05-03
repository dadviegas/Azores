import { useEffect, useMemo, useState } from "react";
import { getStorage } from "@azores/core";
import { Bar, Bars, Big, Btn, Row, Sub, Wrap } from "./WaterTracker.styles.js";

const KEY = "water-tracker:v1";
const TARGET = 8;
const today = (): string => new Date().toISOString().slice(0, 10);

type State = Record<string, number>;

export const WaterTracker = (): JSX.Element => {
  const [state, setState] = useState<State>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<State>(KEY);
      if (cancelled) return;
      setState(stored && typeof stored === "object" ? stored : {});
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void getStorage().set<State>(KEY, state);
  }, [state, hydrated]);

  const day = today();
  const count = state[day] ?? 0;

  const inc = (n: number): void =>
    setState((s) => ({ ...s, [day]: Math.max(0, (s[day] ?? 0) + n) }));

  const last7 = useMemo(() => {
    const arr: Array<{ d: string; v: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      arr.push({ d: k, v: state[k] ?? 0 });
    }
    return arr;
  }, [state]);

  return (
    <Wrap>
      <Big>{count}</Big>
      <Sub>of {TARGET} glasses today</Sub>
      <Row>
        <Btn onClick={() => inc(-1)}>−</Btn>
        <Btn onClick={() => inc(1)}>+ Glass</Btn>
      </Row>
      <Bars aria-label="Last 7 days">
        {last7.map((d) => (
          <Bar key={d.d} $h={Math.min(100, (d.v / TARGET) * 100)} title={`${d.d}: ${d.v}`} />
        ))}
      </Bars>
    </Wrap>
  );
};

export default WaterTracker;
