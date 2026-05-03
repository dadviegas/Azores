import { useEffect, useState } from "react";
import { Big, Input, List, Row, Sm, Val, Wrap } from "./AgeCalc.styles.js";

export const AgeCalc = (): JSX.Element => {
  const [dob, setDob] = useState("1990-01-01");
  const [, force] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => force((n) => n + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return <Wrap><Big>—</Big></Wrap>;
  const now = new Date();
  let y = now.getFullYear() - d.getFullYear();
  let m = now.getMonth() - d.getMonth();
  let days = now.getDate() - d.getDate();
  if (days < 0) {
    m--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }
  const totalDays = Math.floor((now.getTime() - d.getTime()) / 86_400_000);

  return (
    <Wrap>
      <Row>DOB <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} /></Row>
      <Big>{y}y {m}m {days}d</Big>
      <List>
        <Sm>Weeks <Val>{Math.floor(totalDays / 7).toLocaleString()}</Val></Sm>
        <Sm>Days <Val>{totalDays.toLocaleString()}</Val></Sm>
        <Sm>Hours <Val>{(totalDays * 24).toLocaleString()}</Val></Sm>
        <Sm>Seconds <Val>{Math.floor((now.getTime() - d.getTime()) / 1000).toLocaleString()}</Val></Sm>
      </List>
    </Wrap>
  );
};

export default AgeCalc;
