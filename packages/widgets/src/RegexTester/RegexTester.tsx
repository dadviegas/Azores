import { useMemo, useState } from "react";
import {
  Flags,
  Input,
  Matches,
  Row,
  Status,
  TextArea,
  Wrap,
} from "./RegexTester.styles.js";

export const RegexTester = (): JSX.Element => {
  const [pattern, setPattern] = useState<string>("\\b(\\w+)@(\\w+\\.\\w+)\\b");
  const [flags, setFlags] = useState<string>("g");
  const [text, setText] = useState<string>(
    "Reach me at jane@example.com or admin@azores.dev — fast.",
  );

  const result = useMemo(() => {
    if (!pattern) return { ok: true, matches: [] as RegExpMatchArray[] };
    try {
      const re = new RegExp(pattern, flags);
      const out: RegExpMatchArray[] = [];
      if (re.global) {
        for (const m of text.matchAll(re)) out.push(m);
      } else {
        const m = re.exec(text);
        if (m) out.push(m);
      }
      return { ok: true as const, matches: out };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "invalid" };
    }
  }, [pattern, flags, text]);

  return (
    <Wrap>
      <Row>
        <span style={{ fontFamily: "var(--az-font-mono)", color: "var(--az-text-3)" }}>/</span>
        <Input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          spellCheck={false}
          aria-label="Pattern"
        />
        <span style={{ fontFamily: "var(--az-font-mono)", color: "var(--az-text-3)" }}>/</span>
        <Flags
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          spellCheck={false}
          aria-label="Flags"
          placeholder="gimsu"
        />
      </Row>
      <TextArea value={text} onChange={(e) => setText(e.target.value)} aria-label="Test text" />
      {result.ok ? (
        <>
          <Status>{result.matches.length} match{result.matches.length === 1 ? "" : "es"}</Status>
          <Matches>
            {result.matches.length === 0 ? (
              <span style={{ color: "var(--az-text-3)" }}>No matches.</span>
            ) : (
              result.matches.map((m, i) => (
                <div key={i}>
                  <strong>{i}:</strong> {m[0]}
                  {m.length > 1 ? (
                    <span style={{ color: "var(--az-text-3)" }}>
                      {" "}· groups: [{m.slice(1).map((g) => JSON.stringify(g)).join(", ")}]
                    </span>
                  ) : null}
                </div>
              ))
            )}
          </Matches>
        </>
      ) : (
        <Status $error>{result.error}</Status>
      )}
    </Wrap>
  );
};

export default RegexTester;
