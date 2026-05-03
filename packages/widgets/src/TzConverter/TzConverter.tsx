import { useEffect, useState } from "react";
import { Input, Row, Time, Wrap } from "./TzConverter.styles.js";

const ZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Lisbon",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
] as const;

const fmt = (d: Date, tz: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(d);

export const TzConverter = (): JSX.Element => {
  const [iso, setIso] = useState(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return d.toISOString().slice(0, 16);
  });
  // Auto-tick every minute when the user hasn't edited (i.e. ISO matches now).
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    if (pinned) return;
    const id = window.setInterval(() => {
      const d = new Date();
      d.setSeconds(0, 0);
      setIso(d.toISOString().slice(0, 16));
    }, 60_000);
    return () => window.clearInterval(id);
  }, [pinned]);

  const date = new Date(iso);

  return (
    <Wrap>
      <Input
        type="datetime-local"
        value={iso}
        onChange={(e) => {
          setIso(e.target.value);
          setPinned(true);
        }}
        aria-label="Reference time"
      />
      {ZONES.map((z) => (
        <Row key={z}>
          <span>{z.replace(/_/g, " ")}</span>
          <Time>{Number.isFinite(date.getTime()) ? fmt(date, z) : "—"}</Time>
        </Row>
      ))}
    </Wrap>
  );
};

export default TzConverter;
