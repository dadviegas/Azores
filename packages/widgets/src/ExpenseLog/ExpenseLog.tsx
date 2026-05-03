import { useEffect, useState } from "react";
import { getStorage } from "@azores/core";
import {
  Amount,
  Btn,
  Form,
  Input,
  List,
  Row,
  Total,
  Wrap,
  X,
} from "./ExpenseLog.styles.js";

const KEY = "expense-log:v1";
type Item = { id: string; label: string; amount: number; ts: number };

export const ExpenseLog = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [label, setLabel] = useState("");
  const [amt, setAmt] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await getStorage().get<Item[]>(KEY);
      if (cancelled) return;
      setItems(Array.isArray(stored) ? stored : []);
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

  const submit = (e: React.FormEvent): void => {
    e.preventDefault();
    const v = parseFloat(amt);
    if (!label.trim() || !Number.isFinite(v)) return;
    setItems((prev) => [
      { id: `e${Date.now().toString(36)}`, label: label.trim(), amount: v, ts: Date.now() },
      ...prev,
    ]);
    setLabel("");
    setAmt("");
  };

  const total = items.reduce((s, i) => s + i.amount, 0);

  return (
    <Wrap>
      <Form onSubmit={submit}>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          aria-label="Label"
        />
        <Input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="0.00"
          inputMode="decimal"
          aria-label="Amount"
        />
        <Btn type="submit">Add</Btn>
      </Form>
      <Total>
        <span>Total</span>
        <span>{total.toFixed(2)}</span>
      </Total>
      <List>
        {items.map((i) => (
          <Row key={i.id}>
            <span>{i.label}</span>
            <Amount>{i.amount.toFixed(2)}</Amount>
            <X onClick={() => setItems((prev) => prev.filter((x) => x.id !== i.id))} aria-label="Remove">×</X>
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default ExpenseLog;
