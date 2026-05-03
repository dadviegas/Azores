import { useState } from "react";
import { Input, Row, Wrap } from "./SalaryCalc.styles.js";

type Field = "hourly" | "daily" | "weekly" | "monthly" | "annual";

export const SalaryCalc = (): JSX.Element => {
  const [annual, setAnnual] = useState(80000);
  const [hoursPerWeek, setHpw] = useState(40);
  const [weeksPerYear, setWpy] = useState(52);

  const set = (f: Field, v: number): void => {
    const annualHours = hoursPerWeek * weeksPerYear;
    switch (f) {
      case "hourly":
        setAnnual(v * annualHours);
        return;
      case "daily":
        setAnnual((v * weeksPerYear * 5));
        return;
      case "weekly":
        setAnnual(v * weeksPerYear);
        return;
      case "monthly":
        setAnnual(v * 12);
        return;
      case "annual":
        setAnnual(v);
        return;
    }
  };

  const annualHours = hoursPerWeek * weeksPerYear;
  const v = {
    hourly: annual / annualHours,
    daily: annual / weeksPerYear / 5,
    weekly: annual / weeksPerYear,
    monthly: annual / 12,
    annual,
  };

  return (
    <Wrap>
      {(["hourly", "daily", "weekly", "monthly", "annual"] as const).map((f) => (
        <Row key={f}>
          {f}
          <Input
            type="number"
            value={v[f].toFixed(2)}
            onChange={(e) => set(f, parseFloat(e.target.value) || 0)}
          />
        </Row>
      ))}
      <Row>Hrs/wk <Input type="number" value={hoursPerWeek} onChange={(e) => setHpw(parseFloat(e.target.value) || 1)} /></Row>
      <Row>Wks/yr <Input type="number" value={weeksPerYear} onChange={(e) => setWpy(parseFloat(e.target.value) || 1)} /></Row>
    </Wrap>
  );
};

export default SalaryCalc;
