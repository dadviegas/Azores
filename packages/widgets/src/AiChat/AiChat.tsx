import { useEffect, useRef, useState } from "react";
import { chatStream, isAiConfigured, readAiSettings } from "../_ai/client.js";
import {
  Btn,
  Bubble,
  Clear,
  Empty,
  Form,
  Input,
  Log,
  Tag,
  Toolbar,
  Wrap,
} from "./AiChat.styles.js";

type Role = "user" | "assistant" | "error";
type Msg = { role: Role; content: string };

export const AiChat = (): JSX.Element => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  // Streaming reply accumulator, separate from `messages` so we don't
  // re-render the full log on every token. Committed into `messages` once
  // the stream completes.
  const [streaming, setStreaming] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the chat to the bottom whenever a new message lands so the
  // user always sees the latest reply without having to scroll manually.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, streaming]);

  const send = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const prompt = draft.trim();
    if (!prompt || pending) return;
    const next: Msg[] = [...messages, { role: "user", content: prompt }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setStreaming("");
    try {
      // Drop local-only "error" entries before forwarding the conversation
      // — they're UI artifacts, not part of the dialogue.
      const reply = await chatStream(
        next
          .filter((m): m is Msg & { role: "user" | "assistant" } => m.role !== "error")
          .map((m) => ({ role: m.role, content: m.content })),
        (delta) => setStreaming((s) => s + delta),
      );
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "error", content: err instanceof Error ? err.message : String(err) },
      ]);
    } finally {
      setPending(false);
      setStreaming("");
    }
  };

  const settings = readAiSettings();
  const configured = isAiConfigured(settings);

  return (
    <Wrap>
      <Toolbar>
        <Tag>{configured ? settings.model : "not configured"}</Tag>
        {configured ? (
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {settings.apiUrl.replace(/^https?:\/\//, "")}
          </span>
        ) : null}
        {messages.length > 0 ? (
          <Clear onClick={() => setMessages([])}>Clear</Clear>
        ) : null}
      </Toolbar>
      <Log ref={logRef}>
        {messages.length === 0 ? (
          <Empty>
            {configured
              ? "Ask anything. Sent to the URL configured in Tweaks → AI."
              : "Open Tweaks → AI to set an endpoint URL and API key. Works with OpenAI, OpenRouter, LM Studio, or any local LLM exposed via ngrok."}
          </Empty>
        ) : (
          messages.map((m, i) => <Bubble key={i} $role={m.role}>{m.content}</Bubble>)
        )}
        {pending ? (
          <Bubble $role="assistant">{streaming || "…"}</Bubble>
        ) : null}
      </Log>
      <Form onSubmit={send}>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(e as unknown as React.FormEvent);
            }
          }}
          placeholder={configured ? "Message…" : "Configure API in Tweaks first"}
          aria-label="Message"
          rows={1}
        />
        <Btn type="submit" disabled={pending || !draft.trim()}>
          Send
        </Btn>
      </Form>
    </Wrap>
  );
};

export default AiChat;
