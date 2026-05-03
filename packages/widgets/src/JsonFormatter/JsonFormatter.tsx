import { useMemo, useState } from "react";
import { Btn, Status, TextArea, Toolbar, Wrap } from "./JsonFormatter.styles.js";

const SAMPLE = `{"name":"azores","tags":["dev","tools"],"count":42}`;

export const JsonFormatter = (): JSX.Element => {
  const [text, setText] = useState<string>(SAMPLE);

  // Validate on every keystroke. Errors surface as a single-line status with
  // the parser's message; valid input shows the byte/key counts so a user
  // can see the JSON they have at a glance.
  const status = useMemo<{ ok: boolean; msg: string }>(() => {
    if (!text.trim()) return { ok: true, msg: "empty" };
    try {
      const v = JSON.parse(text) as unknown;
      const kind =
        v === null
          ? "null"
          : Array.isArray(v)
            ? `array(${v.length})`
            : typeof v === "object"
              ? `object(${Object.keys(v as object).length})`
              : typeof v;
      return { ok: true, msg: `valid · ${kind} · ${text.length}b` };
    } catch (e) {
      return { ok: false, msg: e instanceof Error ? e.message : "invalid" };
    }
  }, [text]);

  const format = (): void => {
    try {
      const v = JSON.parse(text) as unknown;
      setText(JSON.stringify(v, null, 2));
    } catch {
      // Status already shows the error; ignore here.
    }
  };

  const minify = (): void => {
    try {
      const v = JSON.parse(text) as unknown;
      setText(JSON.stringify(v));
    } catch {
      /* noop */
    }
  };

  return (
    <Wrap>
      <Toolbar>
        <Btn type="button" onClick={format} disabled={!status.ok}>Format</Btn>
        <Btn type="button" onClick={minify} disabled={!status.ok}>Minify</Btn>
        <Btn type="button" onClick={() => setText("")}>Clear</Btn>
        <Status $error={!status.ok}>{status.msg}</Status>
      </Toolbar>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        aria-label="JSON input"
      />
    </Wrap>
  );
};

export default JsonFormatter;
