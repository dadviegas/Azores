import { useState } from "react";
import { Btn, Hint, Input, Row, Tries, Wrap } from "./NumberGuess.styles.js";

const pick = (): number => 1 + Math.floor(Math.random() * 100);

export const NumberGuess = (): JSX.Element => {
  const [secret, setSecret] = useState(pick);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("Guess between 1 and 100");
  const [tries, setTries] = useState(0);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    const n = Number(guess);
    if (!Number.isFinite(n) || n < 1 || n > 100) {
      setHint("Enter 1–100");
      return;
    }
    const next = tries + 1;
    setTries(next);
    if (n === secret) {
      setHint(`Got it in ${next} ${next === 1 ? "try" : "tries"}.`);
      setDone(true);
    } else {
      setHint(n < secret ? "Higher ↑" : "Lower ↓");
    }
    setGuess("");
  };

  const reset = (): void => {
    setSecret(pick());
    setGuess("");
    setHint("Guess between 1 and 100");
    setTries(0);
    setDone(false);
  };

  return (
    <Wrap>
      <Hint>{hint}</Hint>
      <Tries>tries · {tries}</Tries>
      <form onSubmit={submit}>
        <Row>
          <Input
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={done}
            aria-label="Guess"
          />
          <Btn primary type="submit" disabled={done || !guess}>
            Guess
          </Btn>
          <Btn type="button" onClick={reset}>
            New
          </Btn>
        </Row>
      </form>
    </Wrap>
  );
};

export default NumberGuess;
