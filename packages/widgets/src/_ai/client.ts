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
