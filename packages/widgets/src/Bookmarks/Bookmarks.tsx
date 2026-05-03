import { useEffect, useRef, useState } from "react";
import { getStorage } from "@azores/core";
import {
  AddBtn,
  Empty,
  Form,
  Input,
  Item,
  Link,
  List,
  Remove,
  Wrap,
} from "./Bookmarks.styles.js";

const STORAGE_KEY = "bookmarks:items";

type Bookmark = { id: string; label: string; url: string };

const newId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

const normalizeUrl = (raw: string): string => {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
};

export const Bookmarks = (): JSX.Element => {
  const [items, setItems] = useState<Bookmark[]>([]);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Bookmark[]>(STORAGE_KEY);
      if (cancelled) return;
      if (Array.isArray(stored)) setItems(stored);
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current != null) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      void getStorage().set<Bookmark[]>(STORAGE_KEY, items);
    }, 250);
    return () => {
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current);
    };
  }, [items, hydrated]);

  const add = (e: React.FormEvent): void => {
    e.preventDefault();
    const l = label.trim();
    const u = url.trim();
    if (!l || !u) return;
    setItems((prev) => [...prev, { id: newId(), label: l, url: normalizeUrl(u) }]);
    setLabel("");
    setUrl("");
  };

  const remove = (id: string): void =>
    setItems((prev) => prev.filter((b) => b.id !== id));

  return (
    <Wrap>
      <Form onSubmit={add}>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          aria-label="Bookmark label"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          aria-label="Bookmark URL"
        />
        <AddBtn type="submit">Add</AddBtn>
      </Form>
      {items.length === 0 ? (
        <Empty>No bookmarks yet.</Empty>
      ) : (
        <List>
          {items.map((b) => (
            <Item key={b.id}>
              <Link href={b.url} target="_blank" rel="noopener">
                {b.label}
              </Link>
              <Remove
                type="button"
                onClick={() => remove(b.id)}
                aria-label={`Remove ${b.label}`}
              >
                ×
              </Remove>
            </Item>
          ))}
        </List>
      )}
    </Wrap>
  );
};

export default Bookmarks;
