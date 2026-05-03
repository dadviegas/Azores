import { useMemo, useState } from "react";
import { Bar, Big, Chart, Input, Row, Sub, Wrap } from "./CompoundInterest.styles.js";

export const CompoundInterest = (): JSX.Element => {
  const [start, setStart] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const series = useMemo(() => {
    const r = rate / 100 / 12;
    const out: number[] = [];
    let v = start;
    for (let m = 1; m <= years * 12; m++) {
      v = v * (1 + r) + monthly;
      if (m % 12 === 0) out.push(v);
    }
    return out;
  }, [start, monthly, rate, years]);

  const final = series[series.length - 1] ?? start;
  const contributed = start + monthly * years * 12;
  const max = Math.max(...series, 1);

  return (
    <Wrap>
      <Row>Start <Input type="number" value={start} onChange={(e) => setStart(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Monthly <Input type="number" value={monthly} onChange={(e) => setMonthly(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Rate % / yr <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Years <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value, 10) || 1)} /></Row>
      <Big>{final.toFixed(0)}</Big>
      <Sub>Contributed {contributed.toFixed(0)} · Gained {(final - contributed).toFixed(0)}</Sub>
      <Chart>
        {series.map((v, i) => (
          <Bar key={i} $h={(v / max) * 100} title={`Y${i + 1}: ${v.toFixed(0)}`} />
        ))}
      </Chart>
    </Wrap>
  );
};

export default CompoundInterest;
