import { useEffect, useRef, useState } from "react";
import { Btn, Buttons, Lap, Laps, Time, Wrap } from "./Stopwatch.styles.js";

const fmt = (ms: number): string => {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
};

export const Stopwatch = (): JSX.Element => {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef<number | null>(null);
  const baseRef = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    const tick = (): void => {
      const start = startRef.current;
      if (start == null) return;
      setElapsed(baseRef.current + (Date.now() - start));
    };
    const id = window.setInterval(tick, 100);
    return () => window.clearInterval(id);
  }, [running]);

  const start = (): void => {
    baseRef.current = elapsed;
    startRef.current = Date.now();
    setRunning(true);
  };

  const stop = (): void => {
    setRunning(false);
    startRef.current = null;
  };

  const reset = (): void => {
    setRunning(false);
    startRef.current = null;
    baseRef.current = 0;
    setElapsed(0);
    setLaps([]);
  };

  const lap = (): void => setLaps((prev) => [elapsed, ...prev]);

  return (
    <Wrap>
      <Time aria-live="off">{fmt(elapsed)}</Time>
      <Buttons>
        {running ? (
          <Btn onClick={stop}>Stop</Btn>
        ) : (
          <Btn primary onClick={start}>
            Start
          </Btn>
        )}
        <Btn onClick={lap} disabled={!running}>
          Lap
        </Btn>
        <Btn onClick={reset}>Reset</Btn>
      </Buttons>
      {laps.length > 0 ? (
        <Laps>
          {laps.map((t, i) => (
            <Lap key={i}>
              <span>#{laps.length - i}</span>
              <span>{fmt(t)}</span>
            </Lap>
          ))}
        </Laps>
      ) : null}
    </Wrap>
  );
};

export default Stopwatch;
