import { useState } from "react";
import { Board, Btn, Status, Tile, Wrap } from "./Slide15.styles.js";

const SOLVED: ReadonlyArray<number> = [
  1, 2, 3, 4,
  5, 6, 7, 8,
  9, 10, 11, 12,
  13, 14, 15, 0,
];

const adjacent = (a: number, b: number): boolean => {
  const [ar, ac] = [Math.floor(a / 4), a % 4];
  const [br, bc] = [Math.floor(b / 4), b % 4];
  return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
};

// Scramble by performing legal moves only — guarantees a solvable layout.
const scramble = (): number[] => {
  const board = SOLVED.slice();
  let gap = 15;
  for (let i = 0; i < 200; i++) {
    const neighbors = [gap - 4, gap + 4, gap - 1, gap + 1].filter(
      (n) => n >= 0 && n < 16 && adjacent(gap, n),
    );
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)]!;
    [board[gap], board[pick]] = [board[pick]!, board[gap]!];
    gap = pick;
  }
  return board;
};

export const Slide15 = (): JSX.Element => {
  const [board, setBoard] = useState<number[]>(scramble);
  const [moves, setMoves] = useState(0);

  const click = (i: number): void => {
    const gap = board.indexOf(0);
    if (!adjacent(i, gap)) return;
    const next = board.slice();
    [next[i], next[gap]] = [next[gap]!, next[i]!];
    setBoard(next);
    setMoves((n) => n + 1);
  };

  const reset = (): void => {
    setBoard(scramble());
    setMoves(0);
  };

  const solved = board.every((v, i) => v === SOLVED[i]);

  return (
    <Wrap>
      <Board>
        {board.map((v, i) => (
          <Tile
            key={i}
            $gap={v === 0}
            onClick={() => v !== 0 && click(i)}
            aria-label={v === 0 ? "Gap" : `Tile ${v}`}
          >
            {v === 0 ? "" : v}
          </Tile>
        ))}
      </Board>
      <Status>{solved ? `Solved · ${moves} moves` : `moves · ${moves}`}</Status>
      <Btn onClick={reset}>Shuffle</Btn>
    </Wrap>
  );
};

export default Slide15;
