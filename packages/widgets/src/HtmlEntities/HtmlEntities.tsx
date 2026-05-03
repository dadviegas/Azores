import { useMemo, useState } from "react";
import { Btn, Row, TextArea, Wrap } from "./HtmlEntities.styles.js";

type Mode = "encode" | "decode";

const NAMED: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const encode = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => NAMED[c] ?? c);

// Use the browser's parser for robust decode of named + numeric entities.
const decode = (s: string): string => {
  const el = document.createElement("textarea");
  el.innerHTML = s;
  return el.value;
};

export const HtmlEntities = (): JSX.Element => {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>('<p class="x">hello & "world"</p>');

  const out = useMemo(
    () => (mode === "encode" ? encode(input) : decode(input)),
    [mode, input],
  );

  return (
    <Wrap>
      <Row>
        <Btn $active={mode === "encode"} onClick={() => setMode("encode")}>Encode</Btn>
        <Btn $active={mode === "decode"} onClick={() => setMode("decode")}>Decode</Btn>
        <Btn onClick={() => setInput(out)}>Swap →</Btn>
      </Row>
      <TextArea value={input} onChange={(e) => setInput(e.target.value)} aria-label="Input" />
      <TextArea value={out} readOnly aria-label="Output" />
    </Wrap>
  );
};

export default HtmlEntities;
