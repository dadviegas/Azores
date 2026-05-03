import { useState } from "react";
import {
  Btn,
  Controls,
  Count,
  Die,
  Row,
  Total,
  Wrap,
} from "./Dice.styles.js";

const roll = (n: number): number[] =>
  Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 6));

export const Dice = (): JSX.Element => {
  const [count, setCount] = useState(2);
  const [values, setValues] = useState<number[]>(() => roll(2));

  const reroll = (): void => setValues(roll(count));
  const setN = (n: number): void => {
    setCount(n);
    setValues(roll(n));
  };

  const total = values.reduce((a, b) => a + b, 0);

  return (
    <Wrap>
      <Row>
        {values.map((v, i) => (
          <Die key={i}>{v}</Die>
        ))}
      </Row>
      <Total>Total · {total}</Total>
      <Controls>
        <Btn primary onClick={reroll}>
          Roll
        </Btn>
        {[1, 2, 3, 4].map((n) => (
          <Btn key={n} onClick={() => setN(n)} disabled={n === count}>
            {n}d
          </Btn>
        ))}
        <Count>dice</Count>
      </Controls>
    </Wrap>
  );
};

export default Dice;
