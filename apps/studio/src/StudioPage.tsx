// Markdown studio — a standalone editor + live preview backed by the
// storage adapter. Documents are persisted under `studio:docs:<id>` with
// the document index under `studio:docs:index`, all via getStorage() so
// the same data syncs once Phase 14 is wired.

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BrandMark, Button, Icon } from "@azores/ui";
import { MarkdownView } from "@azores/ux";
import { getStorage } from "@azores/core";
import {
  Actions,
  Brand,
  DocItem,
  DocLabel,
  DocList,
  DocMeta,
  DocTitle,
  EditorBody,
  Empty,
  Header,
  IconBtn,
  Main,
  NewBtn,
  Pane,
  PaneHeader,
  PreviewBody,
  Shell,
  Sidebar,
  SidebarHeading,
  SourceArea,
  Status,
  TitleInput,
} from "./StudioPage.styles.js";

const INDEX_KEY = "studio:docs:index";
const DOC_KEY = (id: string): string => `studio:docs:${id}`;
const INDEX_VERSION = 1;

type DocSummary = { id: string; title: string; updated: number };
type DocIndex = { v: number; docs: DocSummary[] };
type Doc = { id: string; title: string; body: string; updated: number };

const newId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `d-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
};

const STARTER = `# Welcome to the Markdown studio

Edit on the left, preview updates as you type. Documents are saved
locally and persist between sessions.

## What you get

- Live preview powered by \`MarkdownView\`
- Syntax highlighting for fenced code blocks
- Tables, blockquotes, task lists, math via \`$ … $\`

\`\`\`ts
const greet = (name: string): string => \`Hello, \${name}\`;
\`\`\`

> Tip: hit **New** in the sidebar to start a fresh document.
`;

const seedIndex = (): { index: DocIndex; first: Doc } => {
  const id = newId();
  const now = Date.now();
  const first: Doc = { id, title: "Welcome", body: STARTER, updated: now };
  return {
    index: { v: INDEX_VERSION, docs: [{ id, title: first.title, updated: now }] },
    first,
  };
};

const isValidIndex = (raw: unknown): raw is DocIndex =>
  typeof raw === "object" &&
  raw !== null &&
  (raw as DocIndex).v === INDEX_VERSION &&
  Array.isArray((raw as DocIndex).docs);

const summarize = (doc: Doc): DocSummary => ({
  id: doc.id,
  title: doc.title || "Untitled",
  updated: doc.updated,
});

const formatTime = (ms: number): string => {
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ms).toLocaleDateString();
};

const downloadMarkdown = (doc: Doc): void => {
  const blob = new Blob([doc.body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = (doc.title || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  a.download = `${safeName || "document"}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const StudioPage = (): JSX.Element => {
  const [index, setIndex] = useState<DocIndex | null>(null);
  const [doc, setDoc] = useState<Doc | null>(null);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimer = useRef<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Hydrate: load the document index, then the most recently updated doc.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const raw = await getStorage().get<DocIndex>(INDEX_KEY);
      if (cancelled) return;
      if (!isValidIndex(raw) || raw.docs.length === 0) {
        const { index: idx, first } = seedIndex();
        await getStorage().set<DocIndex>(INDEX_KEY, idx);
        await getStorage().set<Doc>(DOC_KEY(first.id), first);
        if (cancelled) return;
        setIndex(idx);
        setDoc(first);
        return;
      }
      const sorted = [...raw.docs].sort((a, b) => b.updated - a.updated);
      const head = sorted[0]!;
      const body = await getStorage().get<Doc>(DOC_KEY(head.id));
      if (cancelled) return;
      setIndex(raw);
      setDoc(body ?? { ...head, body: "" });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced save — one write per quiet half-second matters more once the
  // adapter is Supabase.
  useEffect(() => {
    if (!doc || !index) return;
    setSaving("saving");
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      void (async () => {
        const updated = { ...doc, updated: Date.now() };
        await getStorage().set<Doc>(DOC_KEY(updated.id), updated);
        const nextIndex: DocIndex = {
          v: INDEX_VERSION,
          docs: index.docs.map((d) =>
            d.id === updated.id ? summarize(updated) : d,
          ),
        };
        await getStorage().set<DocIndex>(INDEX_KEY, nextIndex);
        setIndex(nextIndex);
        setSaving("saved");
      })();
    }, 500);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
    // doc.updated intentionally excluded — we rewrite it inside the timer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc?.id, doc?.title, doc?.body]);

  const updateBody = (body: string): void => {
    if (!doc) return;
    setDoc({ ...doc, body });
  };

  const updateTitle = (title: string): void => {
    if (!doc) return;
    setDoc({ ...doc, title });
  };

  const select = async (id: string): Promise<void> => {
    const next = await getStorage().get<Doc>(DOC_KEY(id));
    if (next) setDoc(next);
  };

  const create = async (): Promise<void> => {
    if (!index) return;
    const id = newId();
    const now = Date.now();
    const fresh: Doc = { id, title: "Untitled", body: "", updated: now };
    await getStorage().set<Doc>(DOC_KEY(id), fresh);
    const nextIndex: DocIndex = {
      v: INDEX_VERSION,
      docs: [summarize(fresh), ...index.docs],
    };
    await getStorage().set<DocIndex>(INDEX_KEY, nextIndex);
    setIndex(nextIndex);
    setDoc(fresh);
  };

  const remove = async (id: string): Promise<void> => {
    if (!index) return;
    if (!window.confirm("Delete this document?")) return;
    await getStorage().delete(DOC_KEY(id));
    const remaining = index.docs.filter((d) => d.id !== id);
    const nextIndex: DocIndex = { v: INDEX_VERSION, docs: remaining };
    await getStorage().set<DocIndex>(INDEX_KEY, nextIndex);
    setIndex(nextIndex);
    if (doc?.id === id) {
      if (remaining.length > 0) {
        const head = remaining[0]!;
        const next = await getStorage().get<Doc>(DOC_KEY(head.id));
        setDoc(next ?? { ...head, body: "" });
      } else {
        setDoc(null);
      }
    }
  };

  const importFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file || !index) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      const id = newId();
      const now = Date.now();
      const title = file.name.replace(/\.(md|markdown|txt)$/i, "");
      const fresh: Doc = { id, title, body: text, updated: now };
      await getStorage().set<Doc>(DOC_KEY(id), fresh);
      const nextIndex: DocIndex = {
        v: INDEX_VERSION,
        docs: [summarize(fresh), ...index.docs],
      };
      await getStorage().set<DocIndex>(INDEX_KEY, nextIndex);
      setIndex(nextIndex);
      setDoc(fresh);
    };
    reader.readAsText(file);
    // Reset so re-selecting the same file fires again.
    e.target.value = "";
  };

  const sortedDocs = useMemo(
    () => (index ? [...index.docs].sort((a, b) => b.updated - a.updated) : []),
    [index],
  );

  return (
    <Shell>
      <Header>
        <Link
          to="/"
          aria-label="Back to home"
          style={{
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Brand>
            <BrandMark size="md" />
            <span>Markdown studio</span>
          </Brand>
        </Link>
        <Actions>
          <Status>
            {saving === "saving" ? "saving…" : saving === "saved" ? "saved" : ""}
          </Status>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInput.current?.click()}
            disabled={!index}
          >
            <Icon name="upload" size={14} />
            Import
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => doc && downloadMarkdown(doc)}
            disabled={!doc}
          >
            <Icon name="download" size={14} />
            Export
          </Button>
          <Button variant="primary" size="sm" onClick={create} disabled={!index}>
            <Icon name="plus" size={14} />
            New
          </Button>
        </Actions>
        <input
          ref={fileInput}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          onChange={importFile}
          style={{ display: "none" }}
        />
      </Header>

      <Sidebar>
        <SidebarHeading>Documents · {sortedDocs.length}</SidebarHeading>
        <DocList>
          {sortedDocs.map((d) => (
            <DocItem
              key={d.id}
              $active={doc?.id === d.id}
              onClick={() => void select(d.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  void select(d.id);
                }
              }}
            >
              <Icon name="file" size={12} />
              <DocLabel>
                <DocTitle>{d.title || "Untitled"}</DocTitle>
                <DocMeta>{formatTime(d.updated)}</DocMeta>
              </DocLabel>
              <IconBtn
                aria-label={`Delete ${d.title || "Untitled"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  void remove(d.id);
                }}
              >
                <Icon name="trash" size={12} />
              </IconBtn>
            </DocItem>
          ))}
        </DocList>
        <NewBtn onClick={create} disabled={!index}>
          <Icon name="plus" size={12} />
          New document
        </NewBtn>
      </Sidebar>

      <Main>
        <Pane>
          <PaneHeader>
            <TitleInput
              value={doc?.title ?? ""}
              onChange={(e) => updateTitle(e.target.value)}
              placeholder="Untitled"
              aria-label="Document title"
              disabled={!doc}
            />
            <span>{doc ? `${doc.body.length} chars` : ""}</span>
          </PaneHeader>
          <EditorBody>
            {doc ? (
              <SourceArea
                value={doc.body}
                onChange={(e) => updateBody(e.target.value)}
                spellCheck={false}
                aria-label="Markdown source"
                placeholder="Start typing markdown…"
              />
            ) : (
              <Empty>No document selected.</Empty>
            )}
          </EditorBody>
        </Pane>

        <Pane>
          <PaneHeader>
            <span>Preview</span>
          </PaneHeader>
          <PreviewBody>
            {doc ? (
              <MarkdownView source={doc.body} />
            ) : (
              <Empty>Create a document to start writing.</Empty>
            )}
          </PreviewBody>
        </Pane>
      </Main>
    </Shell>
  );
};
