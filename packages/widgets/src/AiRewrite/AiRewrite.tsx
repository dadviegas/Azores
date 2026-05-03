import { useState } from "react";
import { chat } from "../_ai/client.js";
import { Area, Btn, Out, Pill, Row, Wrap } from "./AiRewrite.styles.js";

const TONES = [
  "formal",
  "casual",
  "shorter",
  "clearer",
  "more confident",
  "friendlier",
  "more concise",
  "academic",
] as const;
type Tone = (typeof TONES)[number];

export const AiRewrite = (): JSX.Element => {
  const [tone, setTone] = useState<Tone>("clearer");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState(false);
  const [pending, setPending] = useState(false);

  const run = async (): Promise<void> => {
    if (!text.trim() || pending) return;
    setPending(true);
    setErr(false);
    setOut("…");
    try {
      const reply = await chat([
        {
          role: "system",
          content: `Rewrite the user's text to be ${tone}. Preserve meaning, language, and any formatting. Reply only with the rewritten text — no preface, no quotes, no commentary.`,
        },
        { role: "user", content: text },
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
        {TONES.map((t) => (
          <Pill key={t} $active={tone === t} onClick={() => setTone(t)}>{t}</Pill>
        ))}
        <Btn type="button" onClick={() => void run()} disabled={pending || !text.trim()}>
          {pending ? "…" : "Rewrite"}
        </Btn>
      </Row>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to rewrite…"
        aria-label="Source"
      />
      <Out $error={err} aria-live="polite">{out || "Rewritten text will appear here."}</Out>
    </Wrap>
  );
};

export default AiRewrite;
