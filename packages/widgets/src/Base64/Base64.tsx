import { useMemo, useState } from "react";
import { Btn, Row, Status, TextArea, Wrap } from "./Base64.styles.js";

type Mode = "encode" | "decode";

// Unicode-safe encode/decode. `btoa`/`atob` choke on multi-byte chars, so we
// route bytes through TextEncoder/TextDecoder.
const enc = (s: string): string => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
};
const dec = (s: string): string => {
  const bin = atob(s.trim());
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
};

export const Base64 = (): JSX.Element => {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("hello world");

  const result = useMemo(() => {
    if (!input) return { ok: true, value: "" };
    try {
      return { ok: true, value: mode === "encode" ? enc(input) : dec(input) };
    } catch (e) {
      return { ok: false, value: e instanceof Error ? e.message : "invalid" };
    }
  }, [input, mode]);

  return (
    <Wrap>
      <Row>
        <Btn $active={mode === "encode"} onClick={() => setMode("encode")}>Encode</Btn>
        <Btn $active={mode === "decode"} onClick={() => setMode("decode")}>Decode</Btn>
        <Btn onClick={() => setInput(result.value)} disabled={!result.ok}>Swap →</Btn>
        <Status $error={!result.ok}>{input.length} → {result.value.length} chars</Status>
      </Row>
      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        spellCheck={false}
        aria-label={mode === "encode" ? "Plain text" : "Base64 input"}
      />
      <TextArea
        value={result.ok ? result.value : ""}
        readOnly
        aria-label="Result"
        style={result.ok ? undefined : { borderColor: "var(--az-danger,#d33)" }}
      />
      {!result.ok ? <Status $error>{result.value}</Status> : null}
    </Wrap>
  );
};

export default Base64;
