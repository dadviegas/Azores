import { useEffect, useRef, useState } from "react";
import { getStorage } from "@azores/core";
import {
  AddBtn,
  Check,
  Empty,
  Form,
  Input,
  Item,
  Label,
  List,
  Remove,
  Wrap,
} from "./Todo.styles.js";

const STORAGE_KEY = "todo:items";

type Item = { id: string; text: string; done: boolean };

const newId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export const Todo = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Item[]>(STORAGE_KEY);
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
      void getStorage().set<Item[]>(STORAGE_KEY, items);
    }, 250);
    return () => {
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current);
    };
  }, [items, hydrated]);

  const add = (e: React.FormEvent): void => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setItems((prev) => [...prev, { id: newId(), text, done: false }]);
    setDraft("");
  };

  const toggle = (id: string): void =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    );

  const remove = (id: string): void =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <Wrap>
      <Form onSubmit={add}>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task…"
          aria-label="New task"
        />
        <AddBtn type="submit">Add</AddBtn>
      </Form>
      {items.length === 0 ? (
        <Empty>Nothing yet.</Empty>
      ) : (
        <List>
          {items.map((it) => (
            <Item key={it.id} done={it.done}>
              <Check
                type="checkbox"
                checked={it.done}
                onChange={() => toggle(it.id)}
                aria-label={`Mark "${it.text}" done`}
              />
              <Label onClick={() => toggle(it.id)}>{it.text}</Label>
              <Remove
                type="button"
                onClick={() => remove(it.id)}
                aria-label={`Remove "${it.text}"`}
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

export default Todo;
