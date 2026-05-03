import { useMemo, useState } from "react";
import { Btn, Row, TextArea, Wrap } from "./UrlEncoder.styles.js";

type Mode = "encode" | "decode";

export const UrlEncoder = (): JSX.Element => {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState<string>("hello world & friends?");

  const out = useMemo(() => {
    try {
      return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch (e) {
      return e instanceof Error ? e.message : "invalid";
    }
  }, [input, mode]);

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

export default UrlEncoder;
