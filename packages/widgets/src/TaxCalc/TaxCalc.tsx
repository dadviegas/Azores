import { useState } from "react";
import { Big, Input, Lbl, Out, Row, Wrap } from "./TaxCalc.styles.js";

export const TaxCalc = (): JSX.Element => {
  const [gross, setGross] = useState(80000);
  const [rate, setRate] = useState(28);

  const tax = gross * (rate / 100);
  const net = gross - tax;

  return (
    <Wrap>
      <Row>Gross <Input type="number" value={gross} onChange={(e) => setGross(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Tax % <Input type="number" step="0.5" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Out>
        <div><Big>{net.toFixed(0)}</Big><Lbl>Net</Lbl></div>
        <div><Big>{tax.toFixed(0)}</Big><Lbl>Tax</Lbl></div>
        <div><Big>{(net / 12).toFixed(0)}</Big><Lbl>Net /mo</Lbl></div>
        <div><Big>{(net / 52 / 40).toFixed(2)}</Big><Lbl>Net /hr</Lbl></div>
      </Out>
    </Wrap>
  );
};

export default TaxCalc;
