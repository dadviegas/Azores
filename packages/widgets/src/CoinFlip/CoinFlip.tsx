import { useState } from "react";
import { Btn, Coin, Tally, Wrap } from "./CoinFlip.styles.js";

type Side = "H" | "T";

export const CoinFlip = (): JSX.Element => {
  const [side, setSide] = useState<Side>("H");
  const [flipping, setFlipping] = useState(false);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);

  const flip = (): void => {
    if (flipping) return;
    const next: Side = Math.random() < 0.5 ? "H" : "T";
    setFlipping(true);
    // Reveal at the apex of the rotation animation.
    window.setTimeout(() => {
      setSide(next);
      if (next === "H") setHeads((n) => n + 1);
      else setTails((n) => n + 1);
      setFlipping(false);
    }, 600);
  };

  return (
    <Wrap>
      <Coin flipping={flipping} aria-live="polite">
        {side}
      </Coin>
      <Tally>
        <span>H · {heads}</span>
        <span>T · {tails}</span>
      </Tally>
      <Btn type="button" onClick={flip} disabled={flipping}>
        Flip
      </Btn>
    </Wrap>
  );
};

export default CoinFlip;
