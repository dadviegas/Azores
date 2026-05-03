import { useState } from "react";
import { chat } from "../_ai/client.js";
import { Area, Btn, Out, Row, Select, Wrap } from "./AiTranslate.styles.js";

const LANGS = [
  "English", "Portuguese", "Spanish", "French", "German", "Italian",
  "Dutch", "Polish", "Japanese", "Mandarin Chinese", "Korean",
  "Arabic", "Hindi", "Turkish", "Russian", "Ukrainian", "Greek",
  "Swedish", "Norwegian", "Danish", "Finnish",
];

export const AiTranslate = (): JSX.Element => {
  const [target, setTarget] = useState("English");
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
          content: `Translate the user's text into ${target}. Detect the source language automatically. Reply with only the translation, no preamble or commentary.`,
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
        <span style={{ fontSize: 11, color: "var(--az-text-3)" }}>To</span>
        <Select value={target} onChange={(e) => setTarget(e.target.value)} aria-label="Target language">
          {LANGS.map((l) => <option key={l} value={l}>{l}</option>)}
        </Select>
        <Btn type="button" onClick={() => void run()} disabled={pending || !text.trim()}>
          {pending ? "…" : "Translate"}
        </Btn>
      </Row>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste text to translate…"
        aria-label="Source"
      />
      <Out $error={err} aria-live="polite">{out || "Translation will appear here."}</Out>
    </Wrap>
  );
};

export default AiTranslate;
