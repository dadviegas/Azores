import { LoadingShimmer } from "@azores/ui";
import {
  SUNRISE_SOURCE_NAME,
  useSource,
  type SunriseData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Cell,
  DayLength,
  Empty,
  Label,
  Row,
  Value,
  Wrap,
} from "./Sunrise.styles.js";

const fmtTime = (iso: string): string =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

// Accepts either seconds (number, when formatted=0) or "HH:MM:SS" string.
const fmtDayLength = (s: number | string): string => {
  if (typeof s === "number") {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return `${h}h ${m}m`;
  }
  const [h, m] = s.split(":");
  return `${Number(h)}h ${Number(m)}m`;
};

export const Sunrise = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<SunriseData>(
    SUNRISE_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 40 }} />
        <LoadingShimmer style={{ height: 14, width: "40%", margin: "0 auto" }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Sun times unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  const { results } = data;

  return (
    <Wrap>
      <Row>
        <Cell>
          <Label>Sunrise</Label>
          <Value>{fmtTime(results.sunrise)}</Value>
        </Cell>
        <Cell>
          <Label>Sunset</Label>
          <Value>{fmtTime(results.sunset)}</Value>
        </Cell>
      </Row>
      <DayLength>Day length · {fmtDayLength(results.day_length)}</DayLength>
    </Wrap>
  );
};

export default Sunrise;
