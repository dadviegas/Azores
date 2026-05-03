import { useMemo, useState } from "react";
import { Btn, Out, Range, Toolbar, Wrap } from "./Lorem.styles.js";

const WORDS = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam " +
  "quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo " +
  "consequat duis aute irure reprehenderit voluptate velit esse cillum " +
  "fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt"
).split(" ");

const sentence = (rand: () => number): string => {
  const len = 8 + Math.floor(rand() * 12);
  const parts: string[] = [];
  for (let i = 0; i < len; i++) parts.push(WORDS[Math.floor(rand() * WORDS.length)]!);
  parts[0] = parts[0]!.charAt(0).toUpperCase() + parts[0]!.slice(1);
  return parts.join(" ") + ".";
};

const paragraph = (rand: () => number): string => {
  const n = 3 + Math.floor(rand() * 4);
  const out: string[] = [];
  for (let i = 0; i < n; i++) out.push(sentence(rand));
  return out.join(" ");
};

export const Lorem = (): JSX.Element => {
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(0);
  const text = useMemo(() => {
    let s = seed + 1;
    const rand = (): number => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => paragraph(rand)).join("\n\n");
  }, [count, seed]);

  return (
    <Wrap>
      <Toolbar>
        Paragraphs {count}
        <Range
          type="range"
          min={1}
          max={10}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
        />
        <Btn onClick={() => setSeed((s) => s + 1)}>Regen</Btn>
        <Btn onClick={() => void navigator.clipboard?.writeText(text)}>Copy</Btn>
      </Toolbar>
      <Out>{text.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</Out>
    </Wrap>
  );
};

export default Lorem;
