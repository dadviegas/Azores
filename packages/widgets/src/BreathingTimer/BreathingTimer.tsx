import { useEffect, useState } from "react";
import { Bubble, Phase, Wrap } from "./BreathingTimer.styles.js";

const PHASES = ["Inhale", "Hold", "Exhale", "Hold"] as const;
const STEP_MS = 4000;

export const BreathingTimer = (): JSX.Element => {
  const [phase, setPhase] = useState(0);
  const [tick, setTick] = useState(STEP_MS / 1000);

  useEffect(() => {
    const tickId = window.setInterval(() => setTick((t) => (t > 1 ? t - 1 : STEP_MS / 1000)), 1000);
    const phaseId = window.setInterval(() => setPhase((p) => (p + 1) % PHASES.length), STEP_MS);
    return () => {
      window.clearInterval(tickId);
      window.clearInterval(phaseId);
    };
  }, []);

  // Inhale grows 0.7→1.2; Exhale shrinks; holds keep size.
  const scale = phase === 0 ? 1.2 : phase === 2 ? 0.7 : phase === 1 ? 1.2 : 0.7;
  return (
    <Wrap>
      <Bubble $scale={scale}>{tick}</Bubble>
      <Phase>{PHASES[phase]}</Phase>
    </Wrap>
  );
};

export default BreathingTimer;
