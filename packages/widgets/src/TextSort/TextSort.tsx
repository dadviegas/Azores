import { useState } from "react";
import { Area, Btn, Toolbar, Wrap } from "./TextSort.styles.js";

const lines = (s: string): string[] => s.split(/\r?\n/);

export const TextSort = (): JSX.Element => {
  const [text, setText] = useState("delta\nalpha\ngamma\nalpha\nbeta");

  const op = (fn: (xs: string[]) => string[]): void =>
    setText(fn(lines(text)).join("\n"));

  return (
    <Wrap>
      <Toolbar>
        <Btn onClick={() => op((xs) => [...xs].sort((a, b) => a.localeCompare(b)))}>A→Z</Btn>
        <Btn onClick={() => op((xs) => [...xs].sort((a, b) => b.localeCompare(a)))}>Z→A</Btn>
        <Btn onClick={() => op((xs) => [...xs].reverse())}>Reverse</Btn>
        <Btn onClick={() => op((xs) => [...new Set(xs)])}>Dedupe</Btn>
        <Btn
          onClick={() =>
            op((xs) => {
              const a = [...xs];
              for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j]!, a[i]!];
              }
              return a;
            })
          }
        >
          Shuffle
        </Btn>
        <Btn onClick={() => op((xs) => xs.map((l) => l.trim()))}>Trim</Btn>
        <Btn onClick={() => op((xs) => xs.filter((l) => l.trim() !== ""))}>No blanks</Btn>
      </Toolbar>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="Lines"
      />
    </Wrap>
  );
};

export default TextSort;
