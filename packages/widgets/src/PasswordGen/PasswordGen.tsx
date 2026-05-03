import { useCallback, useEffect, useState } from "react";
import { Btn, Out, Range, Row, Wrap } from "./PasswordGen.styles.js";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}<>?",
};

const gen = (len: number, alphabet: string): string => {
  if (!alphabet) return "";
  const out = new Array<string>(len);
  const buf = new Uint32Array(len);
  crypto.getRandomValues(buf);
  for (let i = 0; i < len; i++) out[i] = alphabet[buf[i]! % alphabet.length]!;
  return out.join("");
};

export const PasswordGen = (): JSX.Element => {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [pw, setPw] = useState("");

  const regen = useCallback(() => {
    const alphabet =
      (opts.lower ? SETS.lower : "") +
      (opts.upper ? SETS.upper : "") +
      (opts.digits ? SETS.digits : "") +
      (opts.symbols ? SETS.symbols : "");
    setPw(gen(len, alphabet));
  }, [len, opts]);

  useEffect(regen, [regen]);

  return (
    <Wrap>
      <Out
        onClick={() => {
          void navigator.clipboard?.writeText(pw);
        }}
        title="Click to copy"
      >
        {pw || <span style={{ color: "var(--az-text-3)" }}>Pick at least one set</span>}
      </Out>
      <Row>
        Length {len}
        <Range
          type="range"
          min={6}
          max={64}
          value={len}
          onChange={(e) => setLen(parseInt(e.target.value, 10))}
        />
      </Row>
      {(["lower", "upper", "digits", "symbols"] as const).map((k) => (
        <Row key={k}>
          <input
            type="checkbox"
            checked={opts[k]}
            onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))}
          />
          {k}
        </Row>
      ))}
      <Btn onClick={regen}>Regenerate</Btn>
    </Wrap>
  );
};

export default PasswordGen;
