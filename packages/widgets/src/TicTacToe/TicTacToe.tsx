import { useState } from "react";
import { Board, Btn, Cell, Status, Wrap } from "./TicTacToe.styles.js";

type Mark = "X" | "O" | null;

const LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const winner = (b: ReadonlyArray<Mark>): { mark: Mark; line: ReadonlyArray<number> } | null => {
  for (const line of LINES) {
    const [a, b1, c] = line;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return { mark: b[a]!, line };
  }
  return null;
};

export const TicTacToe = (): JSX.Element => {
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");

  const win = winner(board);
  const full = board.every(Boolean);
  const status = win
    ? `${win.mark} wins`
    : full
      ? "Draw"
      : `${turn} to play`;

  const click = (i: number): void => {
    if (board[i] || win) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = (): void => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <Wrap>
      <Board>
        {board.map((m, i) => (
          <Cell
            key={i}
            $win={!!win?.line.includes(i)}
            onClick={() => click(i)}
            aria-label={`Cell ${i + 1}${m ? `, ${m}` : ""}`}
          >
            {m ?? ""}
          </Cell>
        ))}
      </Board>
      <Status>{status}</Status>
      <Btn onClick={reset}>Reset</Btn>
    </Wrap>
  );
};

export default TicTacToe;
