import { useCallback, useEffect, useState } from "react";

// AI settings — stored in localStorage so widgets can read them without a
// React context. The shape is OpenAI-compatible: any endpoint that speaks the
// `/v1/chat/completions` protocol works (OpenAI, OpenRouter, LM Studio,
// Ollama with the openai-compat adapter, or a local server tunnelled via
// ngrok).
//
// The API key never leaves the browser — it's read straight from
// `localStorage` on every request and sent as `Authorization: Bearer <key>`
// to whichever URL the user configured.

export type AiSettings = {
  apiUrl: string;
  apiKey: string;
  model: string;
};

const STORAGE_KEY = "azores:ai-settings";

const DEFAULT_STATE: AiSettings = {
  apiUrl: "",
  apiKey: "",
  model: "gpt-4o-mini",
};

const isStr = (v: unknown): v is string => typeof v === "string";

const readStored = (): AiSettings => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_STATE;
    const c = parsed as Partial<AiSettings>;
    return {
      apiUrl: isStr(c.apiUrl) ? c.apiUrl : DEFAULT_STATE.apiUrl,
      apiKey: isStr(c.apiKey) ? c.apiKey : DEFAULT_STATE.apiKey,
      model: isStr(c.model) && c.model ? c.model : DEFAULT_STATE.model,
    };
  } catch {
    return DEFAULT_STATE;
  }
};

// Synchronous read for widget code that needs the settings without mounting a
// hook. Returns the same shape as the hook. Widgets call this just before
// firing a request so a settings change in the panel is picked up on the
// next send (no event subscription required).
export const readAiSettings = (): AiSettings => readStored();

export type UseAiSettingsResult = {
  settings: AiSettings;
  setApiUrl: (apiUrl: string) => void;
  setApiKey: (apiKey: string) => void;
  setModel: (model: string) => void;
  isConfigured: boolean;
};

export const useAiSettings = (): UseAiSettingsResult => {
  const [settings, setSettings] = useState<AiSettings>(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Best-effort persistence — ignore quota / privacy-mode failures.
    }
  }, [settings]);

  const setApiUrl = useCallback(
    (apiUrl: string) => setSettings((prev) => ({ ...prev, apiUrl })),
    [],
  );
  const setApiKey = useCallback(
    (apiKey: string) => setSettings((prev) => ({ ...prev, apiKey })),
    [],
  );
  const setModel = useCallback(
    (model: string) => setSettings((prev) => ({ ...prev, model })),
    [],
  );

  return {
    settings,
    setApiUrl,
    setApiKey,
    setModel,
    isConfigured: settings.apiUrl.trim().length > 0 && settings.apiKey.trim().length > 0,
  };
};
