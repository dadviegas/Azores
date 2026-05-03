import { useEffect, useRef, useState } from "react";
import { Big, Btn, Cfg, Num, Phase, Round, Row, Wrap } from "./WorkoutTimer.styles.js";

export const WorkoutTimer = (): JSX.Element => {
  const [work, setWork] = useState(40);
  const [rest, setRest] = useState(20);
  const [rounds, setRounds] = useState(8);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"work" | "rest">("work");
  const [round, setRound] = useState(1);
  const [left, setLeft] = useState(40);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    ref.current = window.setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        // Phase boundary: switch work↔rest, advance round, stop on completion.
        setPhase((p) => {
          if (p === "work") return "rest";
          setRound((r) => {
            if (r >= rounds) {
              setRunning(false);
              return r;
            }
            return r + 1;
          });
          return "work";
        });
        return phase === "work" ? rest : work;
      });
    }, 1000);
    return () => {
      if (ref.current != null) window.clearInterval(ref.current);
    };
  }, [running, phase, work, rest, rounds]);

  const reset = (): void => {
    setRunning(false);
    setPhase("work");
    setRound(1);
    setLeft(work);
  };

  return (
    <Wrap>
      <Phase $work={phase === "work"}>{phase}</Phase>
      <Big>{Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</Big>
      <Round>Round {round} / {rounds}</Round>
      <Row>
        <Btn onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</Btn>
        <Btn onClick={reset}>Reset</Btn>
      </Row>
      <Cfg>
        Work <Num type="number" value={work} onChange={(e) => { const v = parseInt(e.target.value, 10) || 1; setWork(v); if (!running && phase === "work") setLeft(v); }} />
        Rest <Num type="number" value={rest} onChange={(e) => setRest(parseInt(e.target.value, 10) || 1)} />
        Rounds <Num type="number" value={rounds} onChange={(e) => setRounds(parseInt(e.target.value, 10) || 1)} />
      </Cfg>
    </Wrap>
  );
};

export default WorkoutTimer;
