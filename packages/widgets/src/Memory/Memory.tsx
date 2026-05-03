import { useEffect, useState } from "react";
import { Board, Btn, Card, Status, Wrap } from "./Memory.styles.js";

const SYMBOLS = ["★", "●", "▲", "■", "♦", "✦"] as const;

type CardState = { id: number; sym: string; matched: boolean };

const shuffle = <T,>(arr: ReadonlyArray<T>): T[] => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

const fresh = (): CardState[] =>
  shuffle([...SYMBOLS, ...SYMBOLS]).map((sym, i) => ({
    id: i,
    sym,
    matched: false,
  }));

export const Memory = (): JSX.Element => {
  const [cards, setCards] = useState<CardState[]>(fresh);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const ca = cards[a!];
    const cb = cards[b!];
    if (ca && cb && ca.sym === cb.sym) {
      setCards((prev) =>
        prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)),
      );
      setFlipped([]);
    } else {
      const t = window.setTimeout(() => setFlipped([]), 700);
      return () => window.clearTimeout(t);
    }
  }, [flipped, cards]);

  const click = (i: number): void => {
    if (flipped.length === 2) return;
    if (flipped.includes(i)) return;
    if (cards[i]?.matched) return;
    setFlipped((prev) => {
      const next = [...prev, i];
      if (next.length === 2) setMoves((n) => n + 1);
      return next;
    });
  };

  const reset = (): void => {
    setCards(fresh());
    setFlipped([]);
    setMoves(0);
  };

  const done = cards.every((c) => c.matched);

  return (
    <Wrap>
      <Board>
        {cards.map((c, i) => {
          const faceUp = c.matched || flipped.includes(i);
          return (
            <Card
              key={c.id}
              $faceUp={faceUp}
              $matched={c.matched}
              onClick={() => click(i)}
              aria-label={faceUp ? c.sym : "Hidden card"}
            >
              {faceUp ? c.sym : ""}
            </Card>
          );
        })}
      </Board>
      <Status>{done ? `Cleared in ${moves} moves` : `moves · ${moves}`}</Status>
      <Btn onClick={reset}>New game</Btn>
    </Wrap>
  );
};

export default Memory;
