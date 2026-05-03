import { useEffect, useState } from "react";
import { City, Name, Time, Wrap } from "./WorldClocks.styles.js";

type Spot = { label: string; tz: string };

const SPOTS: Spot[] = [
  { label: "London", tz: "Europe/London" },
  { label: "New York", tz: "America/New_York" },
  { label: "Tokyo", tz: "Asia/Tokyo" },
  { label: "São Paulo", tz: "America/Sao_Paulo" },
];

const fmt = (d: Date, tz: string): string =>
  d.toLocaleTimeString(undefined, {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const WorldClocks = (): JSX.Element => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Wrap>
      {SPOTS.map((s) => (
        <City key={s.tz}>
          <Name>{s.label}</Name>
          <Time>{fmt(now, s.tz)}</Time>
        </City>
      ))}
    </Wrap>
  );
};

export default WorldClocks;
