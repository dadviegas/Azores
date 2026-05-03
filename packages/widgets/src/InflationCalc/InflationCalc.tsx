import { useState } from "react";
import { Big, Input, Out, Row, Sub, Wrap } from "./InflationCalc.styles.js";

export const InflationCalc = (): JSX.Element => {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(3);
  const [years, setYears] = useState(20);

  const future = amount * Math.pow(1 + rate / 100, years);
  const realValue = amount / Math.pow(1 + rate / 100, years);

  return (
    <Wrap>
      <Row>Amount today <Input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Inflation % <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Years <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value, 10) || 0)} /></Row>
      <Out>
        <Big>{realValue.toFixed(0)}</Big>
        <Sub>What {amount} today is worth in {years}y. To buy the same goods later: {future.toFixed(0)}.</Sub>
      </Out>
    </Wrap>
  );
};

export default InflationCalc;
