import { useState } from "react";
import { Input, Label, Row, Wrap } from "./NumberBase.styles.js";

type Base = 2 | 8 | 10 | 16;
const BASES: Array<{ k: Base; label: string; re: RegExp }> = [
  { k: 2, label: "BIN", re: /^[01]*$/ },
  { k: 8, label: "OCT", re: /^[0-7]*$/ },
  { k: 10, label: "DEC", re: /^\d*$/ },
  { k: 16, label: "HEX", re: /^[0-9a-fA-F]*$/ },
];

export const NumberBase = (): JSX.Element => {
  const [n, setN] = useState<number>(255);
  const [err, setErr] = useState<Base | null>(null);

  const set = (base: Base, raw: string): void => {
    if (raw === "") {
      setN(0);
      setErr(null);
      return;
    }
    const cfg = BASES.find((b) => b.k === base)!;
    if (!cfg.re.test(raw)) {
      setErr(base);
      return;
    }
    const v = parseInt(raw, base);
    if (Number.isNaN(v)) {
      setErr(base);
      return;
    }
    setN(v);
    setErr(null);
  };

  return (
    <Wrap>
      {BASES.map(({ k, label }) => (
        <Row key={k}>
          <Label>{label}</Label>
          <Input
            value={n.toString(k)}
            onChange={(e) => set(k, e.target.value)}
            spellCheck={false}
            $error={err === k}
            aria-label={`${label} value`}
          />
        </Row>
      ))}
    </Wrap>
  );
};

export default NumberBase;
