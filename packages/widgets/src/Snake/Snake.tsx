import { useEffect, useRef, useState } from "react";
import { Board, Btn, Cell, Status, Wrap } from "./Snake.styles.js";

const COLS = 12;
const ROWS = 12;
const TICK_MS = 140;

type Vec = { x: number; y: number };

const eq = (a: Vec, b: Vec): boolean => a.x === b.x && a.y === b.y;

const placeFood = (snake: ReadonlyArray<Vec>): Vec => {
  while (true) {
    const f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => eq(s, f))) return f;
  }
};

const initial = (): { snake: Vec[]; dir: Vec; food: Vec } => {
  const snake: Vec[] = [
    { x: 6, y: 6 },
    { x: 5, y: 6 },
    { x: 4, y: 6 },
  ];
  return { snake, dir: { x: 1, y: 0 }, food: placeFood(snake) };
};

export const Snake = (): JSX.Element => {
  const [{ snake, dir, food }, setState] = useState(initial);
  const [running, setRunning] = useState(false);
  const [dead, setDead] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        const head = prev.snake[0]!;
        const d = dirRef.current;
        const next = { x: head.x + d.x, y: head.y + d.y };
        const oob = next.x < 0 || next.y < 0 || next.x >= COLS || next.y >= ROWS;
        const hitSelf = prev.snake.some((s) => eq(s, next));
        if (oob || hitSelf) {
          setRunning(false);
          setDead(true);
          return prev;
        }
        const ate = eq(next, prev.food);
        const newSnake = [next, ...prev.snake];
        if (!ate) newSnake.pop();
        return {
          snake: newSnake,
          dir: prev.dir,
          food: ate ? placeFood(newSnake) : prev.food,
        };
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const turn = (nx: number, ny: number): void => {
    const d = dirRef.current;
    if (d.x + nx === 0 && d.y + ny === 0) return; // can't reverse
    setState((prev) => ({ ...prev, dir: { x: nx, y: ny } }));
  };

  const onKey = (e: React.KeyboardEvent): void => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        turn(0, -1);
        e.preventDefault();
        break;
      case "ArrowDown":
      case "s":
        turn(0, 1);
        e.preventDefault();
        break;
      case "ArrowLeft":
      case "a":
        turn(-1, 0);
        e.preventDefault();
        break;
      case "ArrowRight":
      case "d":
        turn(1, 0);
        e.preventDefault();
        break;
    }
  };

  const start = (): void => {
    setState(initial());
    setDead(false);
    setRunning(true);
    wrapRef.current?.focus();
  };

  return (
    <Wrap ref={wrapRef} tabIndex={0} onKeyDown={onKey}>
      <Board $cols={COLS} $rows={ROWS}>
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const x = i % COLS;
          const y = Math.floor(i / COLS);
          const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
          const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const kind = isHead
            ? "head"
            : isBody
              ? "snake"
              : isFood
                ? "food"
                : "empty";
          return <Cell key={i} $kind={kind} />;
        })}
      </Board>
      <Status>
        {dead
          ? `Dead · ${snake.length - 3}`
          : running
            ? `length · ${snake.length}`
            : "Arrow keys / WASD"}
      </Status>
      <Btn primary onClick={start}>
        {running ? "Restart" : dead ? "Play again" : "Start"}
      </Btn>
    </Wrap>
  );
};

export default Snake;
