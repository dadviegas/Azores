import { useState } from "react";
import {
  Arrow,
  Input,
  Row,
  Select,
  Side,
  Tab,
  Tabs,
  Wrap,
} from "./UnitConverter.styles.js";

type Category = "length" | "weight" | "temperature";

// Length and weight share an "in metres" / "in grams" pivot. Temperature has
// non-linear conversions (offset for °C↔°F), so we handle it separately.
const LENGTH: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.344,
  ft: 0.3048,
  in: 0.0254,
};

const WEIGHT: Record<string, number> = {
  g: 1,
  kg: 1000,
  lb: 453.59237,
  oz: 28.3495,
};

const TEMP_UNITS = ["C", "F", "K"] as const;
type Temp = (typeof TEMP_UNITS)[number];

const toC = (v: number, u: Temp): number =>
  u === "C" ? v : u === "F" ? (v - 32) * (5 / 9) : v - 273.15;
const fromC = (v: number, u: Temp): number =>
  u === "C" ? v : u === "F" ? v * (9 / 5) + 32 : v + 273.15;

const fmt = (n: number): string => {
  if (!Number.isFinite(n)) return "—";
  return parseFloat(n.toPrecision(8)).toString();
};

export const UnitConverter = (): JSX.Element => {
  const [cat, setCat] = useState<Category>("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [tempFrom, setTempFrom] = useState<Temp>("C");
  const [tempTo, setTempTo] = useState<Temp>("F");
  const [value, setValue] = useState("1");

  const num = parseFloat(value);

  let result = "—";
  if (Number.isFinite(num)) {
    if (cat === "length") {
      const meters = num * (LENGTH[from] ?? 1);
      result = fmt(meters / (LENGTH[to] ?? 1));
    } else if (cat === "weight") {
      const grams = num * (WEIGHT[from] ?? 1);
      result = fmt(grams / (WEIGHT[to] ?? 1));
    } else {
      result = fmt(fromC(toC(num, tempFrom), tempTo));
    }
  }

  const setCategory = (next: Category): void => {
    setCat(next);
    if (next === "length") {
      setFrom("m");
      setTo("ft");
    } else if (next === "weight") {
      setFrom("kg");
      setTo("lb");
    }
  };

  const opts =
    cat === "length"
      ? Object.keys(LENGTH)
      : cat === "weight"
        ? Object.keys(WEIGHT)
        : (TEMP_UNITS as readonly string[]);

  const fromVal = cat === "temperature" ? tempFrom : from;
  const toVal = cat === "temperature" ? tempTo : to;
  const setFromAny = (v: string): void => {
    if (cat === "temperature") setTempFrom(v as Temp);
    else setFrom(v);
  };
  const setToAny = (v: string): void => {
    if (cat === "temperature") setTempTo(v as Temp);
    else setTo(v);
  };

  return (
    <Wrap>
      <Tabs>
        {(["length", "weight", "temperature"] as Category[]).map((c) => (
          <Tab key={c} type="button" active={c === cat} onClick={() => setCategory(c)}>
            {c}
          </Tab>
        ))}
      </Tabs>
      <Row>
        <Side>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="decimal"
            aria-label="Input value"
          />
          <Select
            value={fromVal}
            onChange={(e) => setFromAny(e.target.value)}
            aria-label="From unit"
          >
            {opts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Side>
        <Arrow>→</Arrow>
        <Side>
          <Input value={result} readOnly aria-label="Result" />
          <Select
            value={toVal}
            onChange={(e) => setToAny(e.target.value)}
            aria-label="To unit"
          >
            {opts.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </Side>
      </Row>
    </Wrap>
  );
};

export default UnitConverter;
