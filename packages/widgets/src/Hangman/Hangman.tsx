import { useState } from "react";
import { Btn, Key, Keyboard, Status, Word, Wrap } from "./Hangman.styles.js";

const WORDS = [
  "azores", "atlantic", "ocean", "island", "volcano", "lighthouse",
  "harbor", "compass", "sailor", "tide", "horizon", "albatross",
  "whale", "dolphin", "lagoon", "marina", "rigging", "mariner",
];

const ALPHA = "abcdefghijklmnopqrstuvwxyz".split("");

const pick = (): string => WORDS[Math.floor(Math.random() * WORDS.length)]!;

export const Hangman = (): JSX.Element => {
  const [word, setWord] = useState(pick);
  const [guesses, setGuesses] = useState<Set<string>>(() => new Set());

  const wrong = [...guesses].filter((g) => !word.includes(g));
  const lives = 6 - wrong.length;
  const won = [...word].every((c) => guesses.has(c));
  const lost = lives <= 0;
  const over = won || lost;

  const guess = (l: string): void => {
    if (over || guesses.has(l)) return;
    setGuesses((prev) => new Set(prev).add(l));
  };

  const reset = (): void => {
    setWord(pick());
    setGuesses(new Set());
  };

  const display = [...word].map((c) => (guesses.has(c) || lost ? c : "_")).join(" ");

  return (
    <Wrap>
      <Word>{display}</Word>
      <Status $lost={lost} $won={won}>
        {won ? "You got it" : lost ? `Lost · ${word}` : `lives · ${lives}`}
      </Status>
      <Keyboard>
        {ALPHA.map((l) => {
          const used = guesses.has(l);
          const hit = used && word.includes(l);
          return (
            <Key key={l} $used={used} $hit={hit} onClick={() => guess(l)} disabled={used || over}>
              {l}
            </Key>
          );
        })}
      </Keyboard>
      <Btn onClick={reset}>New word</Btn>
    </Wrap>
  );
};

export default Hangman;
