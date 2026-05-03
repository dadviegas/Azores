import { useEffect, useState } from "react";
import {
  Day,
  Dow,
  Grid,
  Header,
  Month,
  Wrap,
  Year,
} from "./CalendarMonth.styles.js";

const DOW = ["M", "T", "W", "T", "F", "S", "S"];

type Cell = { day: number; today: boolean; muted: boolean };

// Build a 6-row grid (42 cells) starting on Monday, with leading/trailing
// days from adjacent months muted.
const buildMonth = (now: Date): Cell[] => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();
  // JS getDay(): 0 = Sunday. Shift so Monday = 0.
  const startCol = (first.getDay() + 6) % 7;

  const todayY = now.getFullYear();
  const todayM = now.getMonth();
  const todayD = now.getDate();

  const cells: Cell[] = [];
  for (let i = 0; i < startCol; i++) {
    cells.push({ day: prevLast - startCol + 1 + i, today: false, muted: true });
  }
  for (let d = 1; d <= lastDay; d++) {
    cells.push({
      day: d,
      today: year === todayY && month === todayM && d === todayD,
      muted: false,
    });
  }
  while (cells.length < 42) {
    cells.push({ day: cells.length - startCol - lastDay + 1, today: false, muted: true });
  }
  return cells;
};

export const CalendarMonth = (): JSX.Element => {
  // Re-render at midnight by checking once an hour. Cheap insurance for a
  // long-lived dashboard tab.
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells = buildMonth(now);
  const monthLabel = now.toLocaleDateString(undefined, { month: "long" });

  return (
    <Wrap>
      <Header>
        <Month>{monthLabel}</Month>
        <Year>{now.getFullYear()}</Year>
      </Header>
      <Grid>
        {DOW.map((d, i) => (
          <Dow key={i}>{d}</Dow>
        ))}
        {cells.map((c, i) => (
          <Day key={i} today={c.today} muted={c.muted}>
            {c.day}
          </Day>
        ))}
      </Grid>
    </Wrap>
  );
};

export default CalendarMonth;
