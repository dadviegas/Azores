import { useState } from "react";
import { Btn, Hand, Result, Row, Score, Wrap } from "./RockPaperScissors.styles.js";

type Move = "rock" | "paper" | "scissors";
const ICONS: Record<Move, string> = { rock: "✊", paper: "✋", scissors: "✌️" };
const MOVES: ReadonlyArray<Move> = ["rock", "paper", "scissors"];

const beats = (a: Move, b: Move): boolean =>
  (a === "rock" && b === "scissors") ||
  (a === "paper" && b === "rock") ||
  (a === "scissors" && b === "paper");

export const RockPaperScissors = (): JSX.Element => {
  const [you, setYou] = useState<Move | null>(null);
  const [bot, setBot] = useState<Move | null>(null);
  const [verdict, setVerdict] = useState("Pick a move");
  const [w, setW] = useState(0);
  const [l, setL] = useState(0);
  const [d, setD] = useState(0);

  const play = (m: Move): void => {
    const b = MOVES[Math.floor(Math.random() * 3)]!;
    setYou(m);
    setBot(b);
    if (m === b) {
      setVerdict("Draw");
      setD((n) => n + 1);
    } else if (beats(m, b)) {
      setVerdict("You win");
      setW((n) => n + 1);
    } else {
      setVerdict("You lose");
      setL((n) => n + 1);
    }
  };

  return (
    <Wrap>
      <Hand>
        {you ? ICONS[you] : "·"} <span style={{ opacity: 0.4 }}>vs</span>{" "}
        {bot ? ICONS[bot] : "·"}
      </Hand>
      <Result>{verdict}</Result>
      <Score>
        <span>W · {w}</span>
        <span>L · {l}</span>
        <span>D · {d}</span>
      </Score>
      <Row>
        {MOVES.map((m) => (
          <Btn key={m} onClick={() => play(m)} aria-label={m}>
            {ICONS[m]}
          </Btn>
        ))}
      </Row>
    </Wrap>
  );
};

export default RockPaperScissors;
