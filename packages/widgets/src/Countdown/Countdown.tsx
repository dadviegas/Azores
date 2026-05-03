import { useEffect, useState } from "react";
import {
  Label,
  Number as Num,
  Target,
  Unit,
  Units,
  Wrap,
} from "./Countdown.styles.js";

// New Year's Eve, local time. Tweak via per-instance `data` later if needed.
const targetDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
};

type Parts = { days: number; hours: number; minutes: number; done: boolean };

const diff = (target: Date, now: Date): Parts => {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, done: true };
  const minutes = Math.floor(ms / 60_000) % 60;
  const hours = Math.floor(ms / 3_600_000) % 24;
  const days = Math.floor(ms / 86_400_000);
  return { days, hours, minutes, done: false };
};

export const Countdown = (): JSX.Element => {
  const [target] = useState<Date>(() => targetDate());
  const [parts, setParts] = useState<Parts>(() => diff(target, new Date()));

  useEffect(() => {
    const id = window.setInterval(
      () => setParts(diff(target, new Date())),
      30_000,
    );
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <Wrap>
      <Units>
        <Unit>
          <Num>{parts.days}</Num>
          <Label>Days</Label>
        </Unit>
        <Unit>
          <Num>{String(parts.hours).padStart(2, "0")}</Num>
          <Label>Hours</Label>
        </Unit>
        <Unit>
          <Num>{String(parts.minutes).padStart(2, "0")}</Num>
          <Label>Minutes</Label>
        </Unit>
      </Units>
      <Target>
        until {target.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
      </Target>
    </Wrap>
  );
};

export default Countdown;
