import { useState } from "react";
import { Btn, Card, Row, Score, Verdict, Wrap } from "./HighLow.styles.js";

const FACES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

const draw = (): number => 1 + Math.floor(Math.random() * 13);

export const HighLow = (): JSX.Element => {
  const [card, setCard] = useState(draw);
  const [verdict, setVerdict] = useState<{ text: string; tone?: "ok" | "bad" }>({
    text: "Higher or lower?",
  });
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  const guess = (dir: "h" | "l"): void => {
    const next = draw();
    const win =
      next === card ? false : dir === "h" ? next > card : next < card;
    setCard(next);
    if (win) {
      const s = streak + 1;
      setStreak(s);
      setBest((b) => Math.max(b, s));
      setVerdict({ text: "Right ✓", tone: "ok" });
    } else {
      setStreak(0);
      setVerdict({ text: next === card ? "Tie · reset" : "Wrong ✗", tone: "bad" });
    }
  };

  return (
    <Wrap>
      <Card>{FACES[card - 1]}</Card>
      <Verdict $tone={verdict.tone}>{verdict.text}</Verdict>
      <Row>
        <Btn onClick={() => guess("l")}>Lower</Btn>
        <Btn onClick={() => guess("h")}>Higher</Btn>
      </Row>
      <Score>
        streak · {streak} &nbsp; best · {best}
      </Score>
    </Wrap>
  );
};

export default HighLow;
