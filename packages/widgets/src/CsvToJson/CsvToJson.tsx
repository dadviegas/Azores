import { useMemo, useState } from "react";
import { Area, Btn, Toolbar, Wrap } from "./CsvToJson.styles.js";

type Dir = "csv-to-json" | "json-to-csv";

const csvToObjects = (src: string): unknown => {
  const lines = src.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const head = (lines[0] ?? "").split(",").map((s) => s.trim());
  return lines.slice(1).map((row) => {
    const cells = row.split(",");
    const o: Record<string, string> = {};
    head.forEach((h, i) => {
      o[h] = (cells[i] ?? "").trim();
    });
    return o;
  });
};

const objectsToCsv = (raw: unknown): string => {
  if (!Array.isArray(raw) || raw.length === 0) return "";
  const keys = Array.from(
    raw.reduce<Set<string>>((acc, r) => {
      if (r && typeof r === "object") {
        for (const k of Object.keys(r as Record<string, unknown>)) acc.add(k);
      }
      return acc;
    }, new Set()),
  );
  const head = keys.join(",");
  const body = (raw as Array<Record<string, unknown>>)
    .map((r) =>
      keys
        .map((k) => {
          const v = r[k];
          const s = v == null ? "" : String(v);
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    )
    .join("\n");
  return head + "\n" + body;
};

export const CsvToJson = (): JSX.Element => {
  const [dir, setDir] = useState<Dir>("csv-to-json");
  const [input, setInput] = useState<string>("name,age\nAna,30\nBruno,42");

  const out = useMemo(() => {
    try {
      if (dir === "csv-to-json") return JSON.stringify(csvToObjects(input), null, 2);
      return objectsToCsv(JSON.parse(input));
    } catch (e) {
      return e instanceof Error ? e.message : "invalid";
    }
  }, [dir, input]);

  return (
    <Wrap>
      <Toolbar>
        <Btn $active={dir === "csv-to-json"} onClick={() => setDir("csv-to-json")}>CSV → JSON</Btn>
        <Btn $active={dir === "json-to-csv"} onClick={() => setDir("json-to-csv")}>JSON → CSV</Btn>
        <Btn onClick={() => setInput(out)}>Swap →</Btn>
      </Toolbar>
      <Area
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        aria-label="Input"
      />
      <Area value={out} readOnly aria-label="Output" />
    </Wrap>
  );
};

export default CsvToJson;
