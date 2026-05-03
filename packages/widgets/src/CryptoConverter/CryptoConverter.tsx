import { useState } from "react";
import { Input, Row, Sub, Wrap } from "./CryptoConverter.styles.js";

// Offline converter — pair this with the live `Bitcoin` widget for the
// current rate, then plug it in here. Avoids hitting an exchange API on
// every render and means it works without network.
export const CryptoConverter = (): JSX.Element => {
  const [rate, setRate] = useState(70000); // USD per BTC
  const [btc, setBtc] = useState(1);

  const usd = btc * rate;
  const sats = btc * 100_000_000;

  return (
    <Wrap>
      <Row>BTC <Input type="number" step="0.0001" value={btc} onChange={(e) => setBtc(parseFloat(e.target.value) || 0)} /></Row>
      <Row>USD <Input type="number" value={usd.toFixed(2)} onChange={(e) => setBtc(rate ? (parseFloat(e.target.value) || 0) / rate : 0)} /></Row>
      <Row>sats <Input type="number" value={sats.toFixed(0)} onChange={(e) => setBtc((parseFloat(e.target.value) || 0) / 100_000_000)} /></Row>
      <Row>Rate <Input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value) || 0)} /></Row>
      <Sub>Set the rate manually — pair with the Bitcoin widget for live values.</Sub>
    </Wrap>
  );
};

export default CryptoConverter;
