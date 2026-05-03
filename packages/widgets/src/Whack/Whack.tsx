import { useEffect, useRef, useState } from "react";
import { Board, Btn, Hole, Status, Wrap } from "./Whack.styles.js";

const DURATION = 30;

export const Whack = (): JSX.Element => {
  const [running, setRunning] = useState(false);
  const [mole, setMole] = useState<number>(-1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(DURATION);
  const moleTimer = useRef<number | null>(null);
  const tickTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (moleTimer.current) window.clearTimeout(moleTimer.current);
      if (tickTimer.current) window.clearInterval(tickTimer.current);
    };
  }, []);

  const stop = (): void => {
    setRunning(false);
    setMole(-1);
    if (moleTimer.current) window.clearTimeout(moleTimer.current);
    if (tickTimer.current) window.clearInterval(tickTimer.current);
  };

  const popMole = (): void => {
    setMole(Math.floor(Math.random() * 9));
    moleTimer.current = window.setTimeout(popMole, 700);
  };

  const start = (): void => {
    setScore(0);
    setTime(DURATION);
    setRunning(true);
    popMole();
    tickTimer.current = window.setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          stop();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const whack = (i: number): void => {
    if (!running || i !== mole) return;
    setScore((s) => s + 1);
    setMole(-1);
  };

  return (
    <Wrap>
      <Board>
        {Array.from({ length: 9 }, (_, i) => (
          <Hole
            key={i}
            $up={running && i === mole}
            onClick={() => whack(i)}
            aria-label={`Hole ${i + 1}`}
          />
        ))}
      </Board>
      <Status>
        {running ? `${time}s · score ${score}` : score > 0 ? `final · ${score}` : "30s"}
      </Status>
      <Btn primary onClick={running ? stop : start}>
        {running ? "Stop" : "Start"}
      </Btn>
    </Wrap>
  );
};

export default Whack;
