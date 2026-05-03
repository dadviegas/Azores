import { useEffect, useState } from "react";
import { Big, Box, Lbl, Wrap } from "./WeekNumber.styles.js";

const isoWeek = (d: Date): number => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
};

export const WeekNumber = (): JSX.Element => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000) + 1;
  const quarter = Math.floor(now.getMonth() / 3) + 1;
  const dayOfWeek = now.getDay() || 7;
  return (
    <Wrap>
      <Box><Big>W{isoWeek(now)}</Big><Lbl>ISO week</Lbl></Box>
      <Box><Big>{dayOfYear}</Big><Lbl>Day of year</Lbl></Box>
      <Box><Big>Q{quarter}</Big><Lbl>Quarter</Lbl></Box>
      <Box><Big>{dayOfWeek}</Big><Lbl>Day of week</Lbl></Box>
    </Wrap>
  );
};

export default WeekNumber;
