import { useMemo, useState } from "react";
import { Cell, Char, Codes, Grid, Search, Wrap } from "./AsciiTable.styles.js";

const CONTROL: Record<number, string> = {
  0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
  8: "BS", 9: "HT", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
  16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN",
  23: "ETB", 24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS",
  30: "RS", 31: "US", 127: "DEL",
};

const labelOf = (n: number): string =>
  n in CONTROL ? CONTROL[n]! : n === 32 ? "SP" : String.fromCharCode(n);

const codes: number[] = Array.from({ length: 128 }, (_, i) => i);

export const AsciiTable = (): JSX.Element => {
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return codes;
    return codes.filter((c) => {
      const lab = labelOf(c).toLowerCase();
      return (
        String(c) === n ||
        c.toString(16).padStart(2, "0") === n ||
        c.toString(16) === n ||
        lab.includes(n)
      );
    });
  }, [q]);

  const copy = (s: string): void => void navigator.clipboard?.writeText(s);

  return (
    <Wrap>
      <Search
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search dec, hex, or label…"
        aria-label="Search ASCII"
      />
      <Grid>
        {visible.map((c) => (
          <Cell
            key={c}
            onClick={() => copy(c >= 32 && c !== 127 ? String.fromCharCode(c) : "")}
            title={`Copy ${labelOf(c)}`}
          >
            <Char>{labelOf(c)}</Char>
            <Codes>
              {c} · 0x{c.toString(16).padStart(2, "0")}
            </Codes>
          </Cell>
        ))}
      </Grid>
    </Wrap>
  );
};

export default AsciiTable;
