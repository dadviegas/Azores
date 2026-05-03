import { useMemo, useState } from "react";
import { Input, List, Row, Tag, Val, Wrap } from "./CaseConverter.styles.js";

const tokenize = (s: string): string[] =>
  s
    // Split on transitions: lower→upper, letter↔digit, separators.
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

const cap = (w: string): string => (w[0]?.toUpperCase() ?? "") + w.slice(1);

const styles: Array<[string, (parts: string[]) => string]> = [
  ["camelCase", (p) => p.map((w, i) => (i === 0 ? w : cap(w))).join("")],
  ["PascalCase", (p) => p.map(cap).join("")],
  ["snake_case", (p) => p.join("_")],
  ["kebab-case", (p) => p.join("-")],
  ["CONSTANT_CASE", (p) => p.join("_").toUpperCase()],
  ["Title Case", (p) => p.map(cap).join(" ")],
  ["sentence case", (p) => (p.length > 0 ? cap(p[0]!) + (p.length > 1 ? " " + p.slice(1).join(" ") : "") : "")],
  ["dot.case", (p) => p.join(".")],
  ["path/case", (p) => p.join("/")],
];

export const CaseConverter = (): JSX.Element => {
  const [text, setText] = useState<string>("Hello world from Azores");
  const parts = useMemo(() => tokenize(text), [text]);
  return (
    <Wrap>
      <Input value={text} onChange={(e) => setText(e.target.value)} aria-label="Input" />
      <List>
        {styles.map(([label, fn]) => {
          const v = fn(parts);
          return (
            <Row key={label} onClick={() => void navigator.clipboard?.writeText(v)} title="Click to copy">
              <Tag>{label}</Tag>
              <Val>{v}</Val>
            </Row>
          );
        })}
      </List>
    </Wrap>
  );
};

export default CaseConverter;
