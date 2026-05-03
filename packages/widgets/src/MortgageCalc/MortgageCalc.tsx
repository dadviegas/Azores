import { useState } from "react";
import { Big, Input, Out, Row, Sub, Wrap } from "./MortgageCalc.styles.js";

export const MortgageCalc = (): JSX.Element => {
  const [principal, setP] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  const interest = total - principal;

  return (
    <Wrap>
      <Row>Loan amount <Input type="number" value={principal} onChange={(e) => setP(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Rate % / yr <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Years <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value, 10) || 1)} /></Row>
      <Out>
        <Big>{Number.isFinite(monthly) ? monthly.toFixed(2) : "—"} / mo</Big>
        <Sub>
          Total: {total.toFixed(0)} · Interest: {interest.toFixed(0)} ({((interest / principal) * 100).toFixed(0)}%)
        </Sub>
      </Out>
    </Wrap>
  );
};

export default MortgageCalc;
