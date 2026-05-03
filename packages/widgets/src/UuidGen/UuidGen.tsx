import { useState } from "react";
import { Btn, List, Row, Toolbar, Wrap } from "./UuidGen.styles.js";

const make = (): string =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : ([1e7] as unknown as number).toString().replace(/[018]/g, () => "x");

const initial = (): string[] => Array.from({ length: 5 }, make);

export const UuidGen = (): JSX.Element => {
  const [list, setList] = useState<string[]>(initial);

  const more = (n: number): void => setList((prev) => [...Array.from({ length: n }, make), ...prev].slice(0, 50));
  const copy = (s: string): void => void navigator.clipboard?.writeText(s);

  return (
    <Wrap>
      <Toolbar>
        <Btn onClick={() => more(1)}>+1</Btn>
        <Btn onClick={() => more(5)}>+5</Btn>
        <Btn onClick={() => setList(initial())}>Reset</Btn>
        <Btn onClick={() => copy(list.join("\n"))}>Copy all</Btn>
      </Toolbar>
      <List>
        {list.map((u, i) => (
          <Row key={`${u}-${i}`} onClick={() => copy(u)} title="Click to copy">
            {u}
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default UuidGen;
