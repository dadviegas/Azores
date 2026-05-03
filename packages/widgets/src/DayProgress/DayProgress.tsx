import { useEffect, useState } from "react";
import { Bar, Big, Fill, Lbl, Wrap } from "./DayProgress.styles.js";

export const DayProgress = (): JSX.Element => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day = (now.getTime() - start.getTime()) / 86_400_000 * 100;

  const wkStart = new Date(now);
  wkStart.setHours(9, 0, 0, 0);
  const wkEnd = new Date(now);
  wkEnd.setHours(18, 0, 0, 0);
  const work =
    now < wkStart
      ? 0
      : now > wkEnd
        ? 100
        : ((now.getTime() - wkStart.getTime()) / (wkEnd.getTime() - wkStart.getTime())) * 100;

  return (
    <Wrap>
      <Big>{day.toFixed(1)}%</Big>
      <Lbl>Day</Lbl>
      <Bar><Fill $pct={day} /></Bar>
      <Lbl>Work day (9-18)</Lbl>
      <Bar><Fill $pct={work} $color="#3cb45a" /></Bar>
    </Wrap>
  );
};

export default DayProgress;
