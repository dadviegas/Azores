import { useState } from "react";
import { chat } from "../_ai/client.js";
import { Area, Btn, Out, Sm, Toolbar, Wrap } from "./AiSummarize.styles.js";

type Length = "short" | "medium" | "detailed";

const PROMPT: Record<Length, string> = {
  short: "Summarize the following in 3 short bullet points. Be terse.",
  medium: "Summarize the following in 5-7 bullet points covering the main ideas.",
  detailed:
    "Produce a structured summary of the following: first a one-sentence TL;DR, then a bulleted list of key points, then any notable caveats.",
};

export const AiSummarize = (): JSX.Element => {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState(false);
  const [pending, setPending] = useState(false);
  const [length, setLength] = useState<Length>("medium");

  const run = async (): Promise<void> => {
    if (!text.trim() || pending) return;
    setPending(true);
    setErr(false);
    setOut("…");
    try {
      const reply = await chat([
        { role: "system", content: PROMPT[length] },
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
      <Toolbar>
        {(["short", "medium", "detailed"] as const).map((l) => (
          <Sm
            key={l}
            onClick={() => setLength(l)}
            style={length === l ? { background: "var(--az-primary)", color: "#fff" } : undefined}
          >
            {l}
          </Sm>
        ))}
        <Btn type="button" onClick={() => void run()} disabled={pending || !text.trim()} style={{ marginLeft: "auto" }}>
          {pending ? "…" : "Summarize"}
        </Btn>
      </Toolbar>
      <Area
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste an article, doc, transcript…"
        aria-label="Source text"
      />
      <Out $error={err} aria-live="polite">{out || "Summary will appear here."}</Out>
    </Wrap>
  );
};

export default AiSummarize;
