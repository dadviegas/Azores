import { useState } from "react";
import { Big, Input, Out, Row, Sub, Wrap } from "./LoanCalc.styles.js";

export const LoanCalc = (): JSX.Element => {
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(7.5);
  const [months, setMonths] = useState(60);

  const r = rate / 100 / 12;
  const monthly = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
  const total = monthly * months;

  return (
    <Wrap>
      <Row>Amount <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} /></Row>
      <Row>APR % <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Months <Input type="number" value={months} onChange={(e) => setMonths(parseInt(e.target.value, 10) || 1)} /></Row>
      <Out>
        <Big>{Number.isFinite(monthly) ? monthly.toFixed(2) : "—"} / mo</Big>
        <Sub>Total {total.toFixed(0)} · Interest {(total - amount).toFixed(0)}</Sub>
      </Out>
    </Wrap>
  );
};

export default LoanCalc;
