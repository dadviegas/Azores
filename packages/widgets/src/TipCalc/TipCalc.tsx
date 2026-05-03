import { useState } from "react";
import { Big, Input, Lbl, Out, Row, Wrap } from "./TipCalc.styles.js";

export const TipCalc = (): JSX.Element => {
  const [bill, setBill] = useState(50);
  const [pct, setPct] = useState(15);
  const [people, setPeople] = useState(2);

  const tip = bill * (pct / 100);
  const total = bill + tip;
  const each = people > 0 ? total / people : total;

  return (
    <Wrap>
      <Row>Bill <Input type="number" value={bill} onChange={(e) => setBill(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Tip % <Input type="number" value={pct} onChange={(e) => setPct(parseFloat(e.target.value) || 0)} /></Row>
      <Row>People <Input type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value, 10) || 1))} /></Row>
      <Out>
        <div><Big>{tip.toFixed(2)}</Big><Lbl>Tip</Lbl></div>
        <div><Big>{total.toFixed(2)}</Big><Lbl>Total</Lbl></div>
        <div style={{ gridColumn: "span 2" }}><Big>{each.toFixed(2)}</Big><Lbl>per person</Lbl></div>
      </Out>
    </Wrap>
  );
};

export default TipCalc;
