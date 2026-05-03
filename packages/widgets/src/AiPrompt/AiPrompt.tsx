import { useEffect, useState } from "react";
import { getStorage } from "@azores/core";
import { chat } from "../_ai/client.js";
import {
  Area,
  Bar,
  Btn,
  Form,
  Input,
  Out,
  Pill,
  Run,
  Tag,
  Wrap,
  X,
} from "./AiPrompt.styles.js";

const KEY = "ai-prompt:v1";

type Saved = { id: string; label: string; prompt: string };

const SEED: Saved[] = [
  { id: "p1", label: "TL;DR", prompt: "Summarize the following in one sentence." },
  { id: "p2", label: "Bullet it", prompt: "Convert the following into 5 short bullets." },
  { id: "p3", label: "Fix grammar", prompt: "Fix grammar and typos. Reply with the corrected text only." },
  { id: "p4", label: "Action items", prompt: "Extract action items from the following as a bulleted list." },
  { id: "p5", label: "ELI5", prompt: "Explain the following like I'm five." },
];

export const AiPrompt = (): JSX.Element => {
  const [prompts, setPrompts] = useState<Saved[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string>("");
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState(false);
  const [pending, setPending] = useState(false);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftPrompt, setDraftPrompt] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Saved[]>(KEY);
      if (cancelled) return;
      setPrompts(Array.isArray(stored) && stored.length ? stored : SEED);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void getStorage().set<Saved[]>(KEY, prompts);
  }, [prompts, hydrated]);

  const run = async (system: string): Promise<void> => {
    if (!input.trim() || pending) return;
    setActivePrompt(system);
    setPending(true);
    setErr(false);
    setOut("…");
    try {
      const reply = await chat([
        { role: "system", content: system },
        { role: "user", content: input },
      ]);
      setOut(reply);
    } catch (e) {
      setErr(true);
      setOut(e instanceof Error ? e.message : String(e));
    } finally {
      setPending(false);
    }
  };

  const add = (): void => {
    if (!draftLabel.trim() || !draftPrompt.trim()) return;
    setPrompts((p) => [
      ...p,
      { id: `p${Date.now().toString(36)}`, label: draftLabel.trim(), prompt: draftPrompt.trim() },
    ]);
    setDraftLabel("");
    setDraftPrompt("");
  };

  const remove = (id: string): void =>
    setPrompts((p) => p.filter((x) => x.id !== id));

  return (
    <Wrap>
      <Bar>
        {prompts.map((p) => (
          <Pill
            key={p.id}
            onClick={() => void run(p.prompt)}
            title={p.prompt}
            style={
              activePrompt === p.prompt
                ? { background: "var(--az-primary)", color: "#fff" }
                : undefined
            }
          >
            {p.label}
            <X
              onClick={(e) => {
                e.stopPropagation();
                remove(p.id);
              }}
            >
              ×
            </X>
          </Pill>
        ))}
      </Bar>

      <Tag>Input</Tag>
      <Area
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Text to feed to the chosen prompt…"
        aria-label="Input"
      />
      <Out $error={err} aria-live="polite">{out || "Click a prompt to run it on the input."}</Out>

      <Tag>Save a new prompt</Tag>
      <Form>
        <Input
          value={draftLabel}
          onChange={(e) => setDraftLabel(e.target.value)}
          placeholder="Label"
        />
        <Input
          value={draftPrompt}
          onChange={(e) => setDraftPrompt(e.target.value)}
          placeholder="System prompt"
        />
        <Btn onClick={add} disabled={!draftLabel.trim() || !draftPrompt.trim()}>
          Save
        </Btn>
      </Form>
      <Run onClick={() => void run(activePrompt)} disabled={pending || !activePrompt || !input.trim()} hidden>
        Re-run
      </Run>
    </Wrap>
  );
};

export default AiPrompt;
