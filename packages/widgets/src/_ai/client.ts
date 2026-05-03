// Shared OpenAI-compatible client for widgets in the AI category. The
// settings layer lives in `@azores/ux` (`useAiSettings` + Tweaks panel) and
// writes a JSON blob to `localStorage` under the key below; widgets never
// import from `@azores/ux` directly so the package stays a leaf — they read
// the same key here. The shape is the contract.

const AI_SETTINGS_KEY = "azores:ai-settings";

export type AiSettings = {
  apiUrl: string;
  apiKey: string;
  model: string;
};

export const readAiSettings = (): AiSettings => {
  const fallback: AiSettings = { apiUrl: "", apiKey: "", model: "gpt-4o-mini" };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(AI_SETTINGS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<AiSettings>;
    return {
      apiUrl: typeof parsed.apiUrl === "string" ? parsed.apiUrl : "",
      apiKey: typeof parsed.apiKey === "string" ? parsed.apiKey : "",
      model:
        typeof parsed.model === "string" && parsed.model
          ? parsed.model
          : fallback.model,
    };
  } catch {
    return fallback;
  }
};

export const isAiConfigured = (s: AiSettings = readAiSettings()): boolean =>
  s.apiUrl.trim().length > 0 && s.apiKey.trim().length > 0;

const buildEndpoint = (apiUrl: string): string => {
  const trimmed = apiUrl.trim().replace(/\/+$/, "");
  // Allow either `https://host` or the full path so users who copied the
  // exact URL from their provider's docs aren't double-suffixed.
  if (/\/v1\/chat\/completions$/.test(trimmed)) return trimmed;
  return `${trimmed}/v1/chat/completions`;
};

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ChatOptions = {
  // Optional override for the default model from settings (e.g. force a
  // smaller model for a one-shot summary).
  model?: string;
  // Hard request cap; 0 disables the cap. Default 2048 keeps latency
  // predictable on free-tier endpoints.
  maxTokens?: number;
  signal?: AbortSignal;
};

export const chat = async (
  messages: ReadonlyArray<ChatMessage>,
  opts: ChatOptions = {},
): Promise<string> => {
  const settings = readAiSettings();
  if (!isAiConfigured(settings)) {
    throw new Error("Set API URL and key in Tweaks → AI.");
  }
  const body: Record<string, unknown> = {
    model: opts.model ?? settings.model,
    messages,
  };
  if (opts.maxTokens && opts.maxTokens > 0) body.max_tokens = opts.maxTokens;
  const res = await fetch(buildEndpoint(settings.apiUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`,
      // Bypass ngrok's free-tier splash page.
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}${text ? ` · ${text.slice(0, 200)}` : ""}`);
  }
  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>;
  };
  const reply = json.choices?.[0]?.message?.content;
  if (typeof reply !== "string") throw new Error("Unexpected response shape");
  return reply.trim();
};

// Streaming variant. Emits each delta token via `onToken` and resolves with
// the concatenated reply once the upstream sends `data: [DONE]`. Errors
// (HTTP non-2xx, malformed SSE, missing settings) reject; AbortSignal
// cancels mid-stream and rejects with a DOMException("AbortError").
//
// The OpenAI SSE shape: `data: {json}\n\n` lines, where each json has
// `choices[0].delta.content` (string fragment). The terminator is the
// literal `data: [DONE]`. We tolerate keep-alive comments (`: ping`) and
// chunked boundary splits across reads.
export const chatStream = async (
  messages: ReadonlyArray<ChatMessage>,
  onToken: (delta: string) => void,
  opts: ChatOptions = {},
): Promise<string> => {
  const settings = readAiSettings();
  if (!isAiConfigured(settings)) {
    throw new Error("Set API URL and key in Tweaks → AI.");
  }
  const body: Record<string, unknown> = {
    model: opts.model ?? settings.model,
    messages,
    stream: true,
  };
  if (opts.maxTokens && opts.maxTokens > 0) body.max_tokens = opts.maxTokens;
  const res = await fetch(buildEndpoint(settings.apiUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${settings.apiKey}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}${text ? ` · ${text.slice(0, 200)}` : ""}`);
  }
  if (!res.body) throw new Error("No response body");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      // SSE events are separated by a blank line. Process whole events from
      // the buffer; leftover partial event stays in `buf` for the next read.
      let idx;
      while ((idx = buf.indexOf("\n\n")) !== -1) {
        const event = buf.slice(0, idx);
        buf = buf.slice(idx + 2);
        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;
          if (payload === "[DONE]") return full;
          try {
            const json = JSON.parse(payload) as {
              choices?: Array<{ delta?: { content?: unknown } }>;
            };
            const delta = json.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) {
              full += delta;
              onToken(delta);
            }
          } catch {
            // Ignore malformed chunks; some providers emit non-JSON pings.
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
  return full;
};
