import { useEffect, useState } from "react";
import { Date as DateLine, Time, Wrap } from "./Clock.styles.js";

const fmtTime = (d: Date): string =>
  d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const fmtDate = (d: Date): string =>
  d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const Clock = (): JSX.Element => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Wrap>
      <Time>{fmtTime(now)}</Time>
      <DateLine>{fmtDate(now)}</DateLine>
    </Wrap>
  );
};

export default Clock;
