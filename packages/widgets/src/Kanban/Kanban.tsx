import { useEffect, useState } from "react";
import { getStorage } from "@azores/core";
import { Add, Card, Col, Head, Items, Wrap, X } from "./Kanban.styles.js";

const KEY = "kanban:v1";
type Lane = "todo" | "doing" | "done";
type Item = { id: string; lane: Lane; text: string };
const LANES: Array<{ k: Lane; label: string }> = [
  { k: "todo", label: "To do" },
  { k: "doing", label: "Doing" },
  { k: "done", label: "Done" },
];

const seed = (): Item[] => [
  { id: "k1", lane: "todo", text: "Plan the week" },
  { id: "k2", lane: "doing", text: "Build kanban widget" },
  { id: "k3", lane: "done", text: "Push first batch" },
];

export const Kanban = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drafts, setDrafts] = useState<Record<Lane, string>>({
    todo: "",
    doing: "",
    done: "",
  });

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Item[]>(KEY);
      if (cancelled) return;
      setItems(Array.isArray(stored) && stored.length ? stored : seed());
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void getStorage().set<Item[]>(KEY, items);
  }, [items, hydrated]);

  const add = (lane: Lane): void => {
    const text = drafts[lane].trim();
    if (!text) return;
    setItems((prev) => [...prev, { id: `k${Date.now().toString(36)}`, lane, text }]);
    setDrafts((d) => ({ ...d, [lane]: "" }));
  };

  const remove = (id: string): void => setItems((prev) => prev.filter((x) => x.id !== id));

  const move = (id: string, lane: Lane): void =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, lane } : x)));

  return (
    <Wrap>
      {LANES.map(({ k, label }) => {
        const lane = items.filter((x) => x.lane === k);
        return (
          <Col
            key={k}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("text/plain");
              if (id) move(id, k);
            }}
          >
            <Head>
              <span>{label}</span>
              <span>{lane.length}</span>
            </Head>
            <Items>
              {lane.map((it) => (
                <Card
                  key={it.id}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", it.id)}
                >
                  <span>{it.text}</span>
                  <X onClick={() => remove(it.id)} aria-label="Remove">×</X>
                </Card>
              ))}
            </Items>
            <Add
              value={drafts[k]}
              onChange={(e) => setDrafts((d) => ({ ...d, [k]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") add(k);
              }}
              placeholder="+ Add card"
              aria-label={`Add to ${label}`}
            />
          </Col>
        );
      })}
    </Wrap>
  );
};

export default Kanban;
