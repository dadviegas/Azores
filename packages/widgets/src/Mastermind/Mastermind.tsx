import { useState } from "react";
import {
  Btn,
  Feedback,
  Hint,
  PickPeg,
  Peg,
  Pegs,
  Picker,
  Row,
  Rows,
  Slot,
  Status,
  Wrap,
} from "./Mastermind.styles.js";

const COLORS = ["#ef4444", "#f59e0b", "#eab308", "#22c55e", "#3b82f6", "#a855f7"] as const;
const CODE_LEN = 4;
const MAX_ROUNDS = 8;

const newCode = (): number[] =>
  Array.from({ length: CODE_LEN }, () => Math.floor(Math.random() * COLORS.length));

type Score = { black: number; white: number };

const score = (guess: ReadonlyArray<number>, code: ReadonlyArray<number>): Score => {
  let black = 0;
  const codeRest: number[] = [];
  const guessRest: number[] = [];
  for (let i = 0; i < CODE_LEN; i++) {
    if (guess[i] === code[i]) black++;
    else {
      codeRest.push(code[i]!);
      guessRest.push(guess[i]!);
    }
  }
  let white = 0;
  for (const g of guessRest) {
    const idx = codeRest.indexOf(g);
    if (idx >= 0) {
      white++;
      codeRest.splice(idx, 1);
    }
  }
  return { black, white };
};

export const Mastermind = (): JSX.Element => {
  const [code, setCode] = useState<number[]>(newCode);
  const [history, setHistory] = useState<{ guess: number[]; score: Score }[]>([]);
  const [draft, setDraft] = useState<(number | null)[]>(Array(CODE_LEN).fill(null));
  const [picked, setPicked] = useState<number>(0);
  const [done, setDone] = useState<"won" | "lost" | null>(null);

  const submit = (): void => {
    if (draft.some((d) => d === null)) return;
    const guess = draft as number[];
    const s = score(guess, code);
    const next = [...history, { guess, score: s }];
    setHistory(next);
    setDraft(Array(CODE_LEN).fill(null));
    if (s.black === CODE_LEN) setDone("won");
    else if (next.length >= MAX_ROUNDS) setDone("lost");
  };

  const setSlot = (i: number): void => {
    if (done) return;
    const next = draft.slice();
    next[i] = picked;
    setDraft(next);
  };

  const reset = (): void => {
    setCode(newCode());
    setHistory([]);
    setDraft(Array(CODE_LEN).fill(null));
    setDone(null);
  };

  return (
    <Wrap>
      <Rows>
        {history.map((h, i) => (
          <Row key={i}>
            <Pegs>
              {h.guess.map((c, j) => (
                <Peg key={j} $color={COLORS[c]!} />
              ))}
            </Pegs>
            <Feedback>
              {Array.from({ length: CODE_LEN }, (_, k) => (
                <Hint
                  key={k}
                  $color={
                    k < h.score.black
                      ? "#000"
                      : k < h.score.black + h.score.white
                        ? "#fff"
                        : "transparent"
                  }
                />
              ))}
            </Feedback>
          </Row>
        ))}
        {!done ? (
          <Row>
            <Pegs>
              {draft.map((c, i) => (
                <Slot
                  key={i}
                  $color={c != null ? COLORS[c] : undefined}
                  onClick={() => setSlot(i)}
                  aria-label={`Slot ${i + 1}`}
                />
              ))}
            </Pegs>
          </Row>
        ) : null}
      </Rows>
      <Status>
        {done === "won"
          ? `Cracked in ${history.length}`
          : done === "lost"
            ? `Code shown · ${history.length}/${MAX_ROUNDS}`
            : `round ${history.length + 1}/${MAX_ROUNDS}`}
      </Status>
      {done === "lost" ? (
        <Pegs>
          {code.map((c, j) => (
            <Peg key={j} $color={COLORS[c]!} />
          ))}
        </Pegs>
      ) : null}
      <Picker>
        {COLORS.map((c, i) => (
          <PickPeg
            key={i}
            $color={c}
            $selected={i === picked}
            onClick={() => setPicked(i)}
            aria-label={`Color ${i + 1}`}
          />
        ))}
      </Picker>
      <div style={{ display: "flex", gap: 8 }}>
        <Btn primary onClick={submit} disabled={!!done || draft.some((d) => d === null)}>
          Guess
        </Btn>
        <Btn onClick={reset}>New code</Btn>
      </div>
    </Wrap>
  );
};

export default Mastermind;
