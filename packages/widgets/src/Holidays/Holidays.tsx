import { LoadingShimmer } from "@azores/ui";
import {
  HOLIDAYS_SOURCE_NAME,
  useSource,
  type HolidaysData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Date as DateLine,
  Days,
  Empty,
  Item,
  List,
  Name,
  Wrap,
} from "./Holidays.styles.js";

const fmtDate = (iso: string): string => {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
};

const daysAway = (iso: string): number => {
  const target = new Date(`${iso}T00:00:00`).getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target - today.getTime()) / 86_400_000);
};

const fmtAway = (n: number): string => {
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  if (n < 0) return "passed";
  return `in ${n}d`;
};

export const Holidays = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<HolidaysData>(
    HOLIDAYS_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <List>
          {[0, 1, 2, 3].map((i) => (
            <Item key={i}>
              <LoadingShimmer style={{ height: 12, width: 50 }} />
              <LoadingShimmer style={{ height: 12, width: "70%" }} />
              <LoadingShimmer style={{ height: 10, width: 36 }} />
            </Item>
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Holidays unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  const upcoming = data.filter((h) => daysAway(h.date) >= 0).slice(0, 10);

  if (upcoming.length === 0) {
    return (
      <Wrap>
        <Empty>No more holidays this year.</Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <List>
        {upcoming.map((h) => {
          const n = daysAway(h.date);
          return (
            <Item key={`${h.date}-${h.name}`}>
              <DateLine>{fmtDate(h.date)}</DateLine>
              <Name>{h.localName}</Name>
              <Days>{fmtAway(n)}</Days>
            </Item>
          );
        })}
      </List>
    </Wrap>
  );
};

export default Holidays;
