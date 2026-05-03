import { useState } from "react";
import { Big, Input, Lbl, Out, Row, Wrap } from "./RoiCalc.styles.js";

export const RoiCalc = (): JSX.Element => {
  const [initial, setInitial] = useState(10000);
  const [final, setFinal] = useState(13500);
  const [years, setYears] = useState(3);

  const gain = final - initial;
  const totalPct = initial !== 0 ? (gain / initial) * 100 : 0;
  const cagr = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : 0;
  const tone = gain >= 0 ? "good" : "bad";

  return (
    <Wrap>
      <Row>Initial <Input type="number" value={initial} onChange={(e) => setInitial(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Final <Input type="number" value={final} onChange={(e) => setFinal(parseFloat(e.target.value) || 0)} /></Row>
      <Row>Years <Input type="number" step="0.1" value={years} onChange={(e) => setYears(parseFloat(e.target.value) || 0)} /></Row>
      <Out>
        <div><Big $tone={tone}>{gain.toFixed(0)}</Big><Lbl>Gain</Lbl></div>
        <div><Big $tone={tone}>{totalPct.toFixed(1)}%</Big><Lbl>Total ROI</Lbl></div>
        <div style={{ gridColumn: "span 2" }}><Big $tone={tone}>{cagr.toFixed(2)}%</Big><Lbl>CAGR / yr</Lbl></div>
      </Out>
    </Wrap>
  );
};

export default RoiCalc;
