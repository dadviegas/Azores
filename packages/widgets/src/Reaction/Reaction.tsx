import { useEffect, useRef, useState } from "react";
import { Pad, Tag, Wrap } from "./Reaction.styles.js";

type State = "idle" | "wait" | "go" | "early";

export const Reaction = (): JSX.Element => {
  const [state, setState] = useState<State>("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const goAt = useRef<number>(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const click = (): void => {
    if (state === "idle" || state === "early") {
      setMs(null);
      setState("wait");
      const delay = 1000 + Math.random() * 2500;
      timer.current = window.setTimeout(() => {
        goAt.current = performance.now();
        setState("go");
      }, delay);
      return;
    }
    if (state === "wait") {
      if (timer.current) window.clearTimeout(timer.current);
      setState("early");
      return;
    }
    if (state === "go") {
      const elapsed = Math.round(performance.now() - goAt.current);
      setMs(elapsed);
      setBest((b) => (b == null || elapsed < b ? elapsed : b));
      setState("idle");
    }
  };

  const label =
    state === "idle"
      ? ms != null ? `${ms} ms · click for next` : "Click to start"
      : state === "wait"
        ? "Wait for green…"
        : state === "go"
          ? "Click!"
          : "Too early — click to try again";

  return (
    <Wrap>
      <Pad $state={state} onClick={click}>
        {label}
      </Pad>
      <Tag>{best != null ? `best · ${best} ms` : ""}</Tag>
    </Wrap>
  );
};

export default Reaction;
