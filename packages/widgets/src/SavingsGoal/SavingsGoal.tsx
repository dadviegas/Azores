import { useState } from "react";
import { Big, Input, Out, Row, Sub, Wrap } from "./SavingsGoal.styles.js";

export const SavingsGoal = (): JSX.Element => {
  const [target, setTarget] = useState(50000);
  const [start, setStart] = useState(2000);
  const [monthly, setMonthly] = useState(800);
  const [rate, setRate] = useState(4);

  const r = rate / 100 / 12;
  let v = start;
  let m = 0;
  while (v < target && m < 1200) {
    v = v * (1 + r) + monthly;
    m++;
  }
  const reached = v >= target;

  return (
    <Wrap>
      <Row>Target <Input type="number" value={target} onChange={(e) => setTarget(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Start <Input type="number" value={start} onChange={(e) => setStart(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Monthly <Input type="number" value={monthly} onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Rate % / yr <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Out>
        {reached ? (
          <>
            <Big>{Math.floor(m / 12)}y {m % 12}m</Big>
            <Sub>Final balance ~{v.toFixed(0)}</Sub>
          </>
        ) : (
          <>
            <Big>—</Big>
            <Sub>Goal not reached within 100 years.</Sub>
          </>
        )}
      </Out>
    </Wrap>
  );
};

export default SavingsGoal;
