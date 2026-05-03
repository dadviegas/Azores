import { useMemo, useState } from "react";
import { Err, Label, Pane, Pre, TextArea, Wrap } from "./JwtDecoder.styles.js";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const b64urlDecode = (s: string): string => {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const norm = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(norm);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
};

const fmt = (raw: string): string => {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
};

export const JwtDecoder = (): JSX.Element => {
  const [token, setToken] = useState<string>(SAMPLE);

  const decoded = useMemo(() => {
    const t = token.trim();
    if (!t) return { ok: true, header: "", payload: "" };
    const parts = t.split(".");
    if (parts.length < 2) return { ok: false, error: "expected 3 dot-separated segments" };
    try {
      const [h, p] = parts as [string, string];
      return { ok: true, header: fmt(b64urlDecode(h)), payload: fmt(b64urlDecode(p)) };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "decode failed" };
    }
  }, [token]);

  return (
    <Wrap>
      <TextArea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        spellCheck={false}
        aria-label="JWT token"
      />
      {decoded.ok ? (
        <Pane>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Label>Header</Label>
            <Pre>{decoded.header}</Pre>
          </div>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <Label>Payload</Label>
            <Pre>{decoded.payload}</Pre>
          </div>
        </Pane>
      ) : (
        <Err>{decoded.error}</Err>
      )}
    </Wrap>
  );
};

export default JwtDecoder;
