import { useState } from "react";
import { Big, Input, Lbl, Out, Row, Wrap } from "./DateDiff.styles.js";

const today = (): string => new Date().toISOString().slice(0, 10);
const future = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
};

export const DateDiff = (): JSX.Element => {
  const [from, setFrom] = useState(today());
  const [to, setTo] = useState(future());

  const f = new Date(from);
  const t = new Date(to);
  const ms = t.getTime() - f.getTime();
  const days = Math.round(ms / 86_400_000);
  const weeks = Math.round(days / 7);
  const months = (t.getFullYear() - f.getFullYear()) * 12 + (t.getMonth() - f.getMonth());
  const years = (days / 365.25).toFixed(2);

  return (
    <Wrap>
      <Row>From <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></Row>
      <Row>To <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></Row>
      <Out>
        <div><Big>{days}</Big><Lbl>Days</Lbl></div>
        <div><Big>{weeks}</Big><Lbl>Weeks</Lbl></div>
        <div><Big>{months}</Big><Lbl>Months</Lbl></div>
        <div><Big>{years}</Big><Lbl>Years</Lbl></div>
      </Out>
    </Wrap>
  );
};

export default DateDiff;
