import { useEffect, useState } from "react";
import { Btn, Buttons, Mode, Time, Wrap } from "./Pomodoro.styles.js";

const WORK_MS = 25 * 60 * 1000;
const BREAK_MS = 5 * 60 * 1000;

type Phase = "work" | "break";
type State =
  | { running: false; phase: Phase; remainingMs: number }
  | { running: true; phase: Phase; endAt: number };

const initial = (): State => ({ running: false, phase: "work", remainingMs: WORK_MS });

const remainingOf = (s: State, now: number): number =>
  s.running ? Math.max(0, s.endAt - now) : s.remainingMs;

const fmt = (ms: number): string => {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export const Pomodoro = (): JSX.Element => {
  const [state, setState] = useState<State>(initial);
  const [, setTick] = useState(0);

  // Drive 1Hz redraw while running so the countdown updates.
  useEffect(() => {
    if (!state.running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, [state.running]);

  // Auto-flip phase on zero.
  useEffect(() => {
    if (!state.running) return;
    const ms = remainingOf(state, Date.now());
    if (ms > 0) return;
    const nextPhase: Phase = state.phase === "work" ? "break" : "work";
    const nextDuration = nextPhase === "work" ? WORK_MS : BREAK_MS;
    setState({ running: false, phase: nextPhase, remainingMs: nextDuration });
  });

  const start = (): void => {
    if (state.running) return;
    setState({ running: true, phase: state.phase, endAt: Date.now() + state.remainingMs });
  };

  const pause = (): void => {
    if (!state.running) return;
    setState({
      running: false,
      phase: state.phase,
      remainingMs: remainingOf(state, Date.now()),
    });
  };

  const reset = (): void =>
    setState({
      running: false,
      phase: state.phase,
      remainingMs: state.phase === "work" ? WORK_MS : BREAK_MS,
    });

  const ms = remainingOf(state, Date.now());
  const isWork = state.phase === "work";

  return (
    <Wrap>
      <Mode work={isWork}>{isWork ? "Focus" : "Break"}</Mode>
      <Time>{fmt(ms)}</Time>
      <Buttons>
        {state.running ? (
          <Btn onClick={pause}>Pause</Btn>
        ) : (
          <Btn onClick={start}>Start</Btn>
        )}
        <Btn onClick={reset}>Reset</Btn>
      </Buttons>
    </Wrap>
  );
};

export default Pomodoro;
