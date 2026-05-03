import { useEffect, useRef, useState } from "react";
import { getStorage } from "@azores/core";
import { Area, SaveStatus, Wrap } from "./Scratchpad.styles.js";

const STORAGE_KEY = "scratchpad:content";

export const Scratchpad = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<string>(STORAGE_KEY);
      if (cancelled) return;
      if (typeof stored === "string") setValue(stored);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    setSaved(false);
    if (timerRef.current != null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      void getStorage()
        .set<string>(STORAGE_KEY, value)
        .then(() => setSaved(true));
    }, 400);
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, [value, hydrated]);

  return (
    <Wrap>
      <Area
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Jot something down…"
        spellCheck
        aria-label="Scratchpad"
      />
      <SaveStatus>{saved ? "Saved" : "Saving…"}</SaveStatus>
    </Wrap>
  );
};

export default Scratchpad;
