import { useEffect, useState } from "react";
import { Body, Disk, Lit, Meta, Phase, Wrap } from "./MoonPhase.styles.js";

const SYNODIC = 29.530588853; // mean synodic month, days
const KNOWN_NEW_MOON_JD = 2451550.1; // 2000-01-06 18:14 UT, a known new moon

const toJulianDay = (d: Date): number => d.getTime() / 86_400_000 + 2440587.5;

// 0..1 around the cycle: 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last
// quarter, then back to new.
const phaseFraction = (d: Date): number => {
  const days = toJulianDay(d) - KNOWN_NEW_MOON_JD;
  const f = (days / SYNODIC) % 1;
  return f < 0 ? f + 1 : f;
};

const phaseName = (f: number): string => {
  if (f < 0.03 || f > 0.97) return "New moon";
  if (f < 0.22) return "Waxing crescent";
  if (f < 0.28) return "First quarter";
  if (f < 0.47) return "Waxing gibbous";
  if (f < 0.53) return "Full moon";
  if (f < 0.72) return "Waning gibbous";
  if (f < 0.78) return "Last quarter";
  return "Waning crescent";
};

const illumination = (f: number): number => {
  // Simple cosine model — close enough for a tile.
  const angle = 2 * Math.PI * f;
  return (1 - Math.cos(angle)) / 2;
};

// Render approximation: shade the disk so the illuminated portion sits on
// the side that matches waxing (right) vs waning (left). Not astronomically
// accurate but reads instantly.
const litInsets = (f: number): { left: number; right: number } => {
  const lit = illumination(f) * 100;
  if (f < 0.5) {
    // waxing: lit grows from the right
    return { left: 100 - lit, right: 0 };
  }
  // waning: lit shrinks from the left
  return { left: 0, right: 100 - lit };
};

export const MoonPhase = (): JSX.Element => {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // Recompute hourly — phase changes far slower than that, but a long-lived
    // dashboard tab should catch the next day's value without a reload.
    const id = window.setInterval(() => setNow(new Date()), 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  const f = phaseFraction(now);
  const insets = litInsets(f);
  const illumPct = Math.round(illumination(f) * 100);
  const dayOfCycle = (f * SYNODIC).toFixed(1);

  return (
    <Wrap>
      <Disk role="img" aria-label={phaseName(f)}>
        <Lit left={insets.left} right={insets.right} />
      </Disk>
      <Body>
        <Phase>{phaseName(f)}</Phase>
        <Meta>
          {illumPct}% lit · day {dayOfCycle}
        </Meta>
      </Body>
    </Wrap>
  );
};

export default MoonPhase;
