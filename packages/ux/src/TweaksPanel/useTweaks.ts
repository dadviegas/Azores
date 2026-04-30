import { useCallback, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
export type AccentId = "ocean" | "volcanic" | "mono" | "violet";

export type TweaksState = {
  theme: ThemeMode;
  accent: AccentId;
};

const STORAGE_KEY = "azores:tweaks";

const DEFAULT_STATE: TweaksState = { theme: "light", accent: "ocean" };

const isThemeMode = (v: unknown): v is ThemeMode => v === "light" || v === "dark";

const isAccent = (v: unknown): v is AccentId =>
  v === "ocean" || v === "volcanic" || v === "mono" || v === "violet";

const readStored = (): TweaksState => {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_STATE;
    const candidate = parsed as { theme?: unknown; accent?: unknown };
    return {
      theme: isThemeMode(candidate.theme) ? candidate.theme : DEFAULT_STATE.theme,
      accent: isAccent(candidate.accent) ? candidate.accent : DEFAULT_STATE.accent,
    };
  } catch {
    return DEFAULT_STATE;
  }
};

const apply = (state: TweaksState): void => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", state.theme);
  if (state.accent === "ocean") {
    root.removeAttribute("data-accent");
  } else {
    root.setAttribute("data-accent", state.accent);
  }
};

export type UseTweaksResult = {
  tweaks: TweaksState;
  setTheme: (theme: ThemeMode) => void;
  setAccent: (accent: AccentId) => void;
  toggleTheme: () => void;
};

export const useTweaks = (): UseTweaksResult => {
  const [tweaks, setTweaks] = useState<TweaksState>(readStored);

  useEffect(() => {
    apply(tweaks);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tweaks));
    } catch {
      // Storage is best-effort; ignore quota / privacy-mode failures.
    }
  }, [tweaks]);

  const setTheme = useCallback(
    (theme: ThemeMode) => setTweaks((prev) => ({ ...prev, theme })),
    [],
  );
  const setAccent = useCallback(
    (accent: AccentId) => setTweaks((prev) => ({ ...prev, accent })),
    [],
  );
  const toggleTheme = useCallback(
    () => setTweaks((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" })),
    [],
  );

  return { tweaks, setTheme, setAccent, toggleTheme };
};
