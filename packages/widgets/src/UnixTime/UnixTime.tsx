import { useEffect, useState } from "react";
import { Big, Input, Row, Wrap } from "./UnixTime.styles.js";

export const UnixTime = (): JSX.Element => {
  const [now, setNow] = useState(Date.now());
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Accept seconds or milliseconds — values larger than 10^11 are ms.
  const parsed = (() => {
    const n = parseFloat(input);
    if (!Number.isFinite(n)) return null;
    return new Date(n > 1e11 ? n : n * 1000);
  })();

  return (
    <Wrap>
      <Big onClick={() => void navigator.clipboard?.writeText(String(Math.floor(now / 1000)))}>
        {Math.floor(now / 1000)}
      </Big>
      <Row>
        Convert
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste seconds or ms…"
          spellCheck={false}
        />
      </Row>
      <div style={{ fontSize: 11, fontFamily: "var(--az-font-mono)", color: "var(--az-text-3)" }}>
        {parsed && Number.isFinite(parsed.getTime())
          ? parsed.toISOString()
          : "Local time will appear here."}
      </div>
    </Wrap>
  );
};

export default UnixTime;
