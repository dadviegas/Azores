import { useState } from "react";
import { Btn, Display, Pad, Wrap } from "./Calculator.styles.js";

type Op = "+" | "-" | "×" | "÷";

const apply = (a: number, b: number, op: Op): number => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
};

const fmt = (n: number): string => {
  if (!Number.isFinite(n)) return "Error";
  // Trim trailing zeros from .toFixed-style values without locale formatting.
  return parseFloat(n.toPrecision(12)).toString();
};

export const Calculator = (): JSX.Element => {
  const [display, setDisplay] = useState<string>("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op | null>(null);
  const [resetNext, setResetNext] = useState<boolean>(false);

  const inputDigit = (d: string): void => {
    if (resetNext || display === "0") {
      setDisplay(d);
      setResetNext(false);
      return;
    }
    setDisplay((prev) => (prev.length >= 12 ? prev : prev + d));
  };

  const inputDot = (): void => {
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const clear = (): void => {
    setDisplay("0");
    setAcc(null);
    setPendingOp(null);
    setResetNext(false);
  };

  const setOp = (op: Op): void => {
    const cur = parseFloat(display);
    if (acc == null || pendingOp == null) {
      setAcc(cur);
    } else if (!resetNext) {
      const next = apply(acc, cur, pendingOp);
      setAcc(next);
      setDisplay(fmt(next));
    }
    setPendingOp(op);
    setResetNext(true);
  };

  const equals = (): void => {
    if (acc == null || pendingOp == null) return;
    const cur = parseFloat(display);
    const next = apply(acc, cur, pendingOp);
    setDisplay(fmt(next));
    setAcc(null);
    setPendingOp(null);
    setResetNext(true);
  };

  const negate = (): void => {
    if (display === "0") return;
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`));
  };

  const percent = (): void => {
    setDisplay((prev) => fmt(parseFloat(prev) / 100));
    setResetNext(true);
  };

  return (
    <Wrap>
      <Display aria-live="polite">{display}</Display>
      <Pad>
        <Btn variant="op" onClick={clear}>AC</Btn>
        <Btn variant="op" onClick={negate}>±</Btn>
        <Btn variant="op" onClick={percent}>%</Btn>
        <Btn variant="op" onClick={() => setOp("÷")}>÷</Btn>

        <Btn onClick={() => inputDigit("7")}>7</Btn>
        <Btn onClick={() => inputDigit("8")}>8</Btn>
        <Btn onClick={() => inputDigit("9")}>9</Btn>
        <Btn variant="op" onClick={() => setOp("×")}>×</Btn>

        <Btn onClick={() => inputDigit("4")}>4</Btn>
        <Btn onClick={() => inputDigit("5")}>5</Btn>
        <Btn onClick={() => inputDigit("6")}>6</Btn>
        <Btn variant="op" onClick={() => setOp("-")}>−</Btn>

        <Btn onClick={() => inputDigit("1")}>1</Btn>
        <Btn onClick={() => inputDigit("2")}>2</Btn>
        <Btn onClick={() => inputDigit("3")}>3</Btn>
        <Btn variant="op" onClick={() => setOp("+")}>+</Btn>

        <Btn variant="wide" onClick={() => inputDigit("0")}>0</Btn>
        <Btn onClick={inputDot}>.</Btn>
        <Btn variant="primary" onClick={equals}>=</Btn>
      </Pad>
    </Wrap>
  );
};

export default Calculator;
