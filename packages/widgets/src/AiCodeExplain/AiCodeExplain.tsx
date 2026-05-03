import { useState } from "react";
import { chat } from "../_ai/client.js";
import { Area, Btn, Out, Row, Sm, Wrap } from "./AiCodeExplain.styles.js";

type Mode = "explain" | "review" | "improve" | "tests";

const SYSTEM: Record<Mode, string> = {
  explain:
    "You are a senior engineer. Explain the user's code in plain English: what it does, why it works, and any subtle behaviors. Use short paragraphs and bullet points. Don't restate the code.",
  review:
    "You are a senior engineer doing a code review. Point out bugs, security issues, edge cases, and unclear naming. Be specific and concise. If the code looks good, say so briefly.",
  improve:
    "Suggest concrete improvements to the user's code (clarity, performance, idiom, safety). Where useful, show a short revised snippet. Avoid sweeping rewrites.",
  tests:
    "Write unit tests for the user's code. Pick the framework that fits the language. Cover happy path + 2-3 edge cases. Reply with only the test code.",
};

export const AiCodeExplain = (): JSX.Element => {
  const [mode, setMode] = useState<Mode>("explain");
  const [code, setCode] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState(false);
  const [pending, setPending] = useState(false);

  const run = async (): Promise<void> => {
    if (!code.trim() || pending) return;
    setPending(true);
    setErr(false);
    setOut("…");
    try {
      const reply = await chat([
        { role: "system", content: SYSTEM[mode] },
        { role: "user", content: code },
      ]);
      setOut(reply);
    } catch (e) {
      setErr(true);
      setOut(e instanceof Error ? e.message : String(e));
    } finally {
      setPending(false);
    }
  };

  return (
    <Wrap>
      <Row>
        {(Object.keys(SYSTEM) as Mode[]).map((m) => (
          <Sm key={m} $active={mode === m} onClick={() => setMode(m)}>{m}</Sm>
        ))}
        <Btn type="button" onClick={() => void run()} disabled={pending || !code.trim()}>
          {pending ? "…" : "Run"}
        </Btn>
      </Row>
      <Area
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste code (any language)…"
        aria-label="Code"
        spellCheck={false}
      />
      <Out $error={err} aria-live="polite">{out || "Result will appear here."}</Out>
    </Wrap>
  );
};

export default AiCodeExplain;
