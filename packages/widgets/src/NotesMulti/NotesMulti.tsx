import { useEffect, useMemo, useState } from "react";
import { getStorage } from "@azores/core";
import {
  Body,
  Btn,
  List,
  NoteRow,
  Search,
  Side,
  Toolbar,
  Wrap,
} from "./NotesMulti.styles.js";

const KEY = "notes-multi:v1";
type Note = { id: string; title: string; body: string; updated: number };

const newNote = (): Note => ({
  id: `n${Date.now().toString(36)}`,
  title: "Untitled",
  body: "",
  updated: Date.now(),
});

export const NotesMulti = (): JSX.Element => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Note[]>(KEY);
      if (cancelled) return;
      const list = Array.isArray(stored) && stored.length ? stored : [newNote()];
      setNotes(list);
      setActiveId(list[0]?.id ?? null);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => void getStorage().set<Note[]>(KEY, notes), 250);
    return () => window.clearTimeout(t);
  }, [notes, hydrated]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return notes;
    return notes.filter(
      (x) => x.title.toLowerCase().includes(n) || x.body.toLowerCase().includes(n),
    );
  }, [q, notes]);

  const active = notes.find((n) => n.id === activeId) ?? null;

  const update = (patch: Partial<Note>): void =>
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId ? { ...n, ...patch, updated: Date.now() } : n,
      ),
    );

  const add = (): void => {
    const fresh = newNote();
    setNotes((prev) => [fresh, ...prev]);
    setActiveId(fresh.id);
  };

  const del = (): void => {
    if (!active) return;
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== active.id);
      setActiveId(next[0]?.id ?? null);
      return next;
    });
  };

  return (
    <Wrap>
      <Side>
        <Search
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          aria-label="Search notes"
        />
        <List>
          {filtered.map((n) => (
            <NoteRow
              key={n.id}
              $active={n.id === activeId}
              onClick={() => setActiveId(n.id)}
            >
              {n.title || "Untitled"}
            </NoteRow>
          ))}
        </List>
        <Toolbar>
          <Btn onClick={add}>+ New</Btn>
          <Btn onClick={del} disabled={!active}>Delete</Btn>
        </Toolbar>
      </Side>
      {active ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minHeight: 0 }}>
          <Search
            value={active.title}
            onChange={(e) => update({ title: e.target.value })}
            aria-label="Title"
          />
          <Body
            value={active.body}
            onChange={(e) => update({ body: e.target.value })}
            placeholder="Write…"
            aria-label="Body"
          />
        </div>
      ) : (
        <div style={{ color: "var(--az-text-3)", fontSize: 12 }}>No note selected.</div>
      )}
    </Wrap>
  );
};

export default NotesMulti;
