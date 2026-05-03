import { useEffect, useState } from "react";
import { Bar, Big, Fill, Sub, Wrap } from "./YearProgress.styles.js";

export const YearProgress = (): JSX.Element => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const start = new Date(now.getFullYear(), 0, 1).getTime();
  const end = new Date(now.getFullYear() + 1, 0, 1).getTime();
  const pct = ((now.getTime() - start) / (end - start)) * 100;
  const daysLeft = Math.ceil((end - now.getTime()) / 86_400_000);
  return (
    <Wrap>
      <Big>{pct.toFixed(2)}%</Big>
      <Bar><Fill $pct={pct} /></Bar>
      <Sub>{daysLeft} days left in {now.getFullYear()}</Sub>
    </Wrap>
  );
};

export default YearProgress;
