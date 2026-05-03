import { LoadingShimmer } from "@azores/ui";
import {
  ISS_SOURCE_NAME,
  useSource,
  type IssData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Coords,
  Empty,
  Label,
  Stat,
  Stats,
  Value,
  Wrap,
} from "./ISS.styles.js";

const fmtCoord = (n: number, axis: "lat" | "lon"): string => {
  const hemi = axis === "lat" ? (n >= 0 ? "N" : "S") : n >= 0 ? "E" : "W";
  return `${Math.abs(n).toFixed(2)}° ${hemi}`;
};

export const ISS = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<IssData>(
    ISS_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 28, width: "70%" }} />
        <LoadingShimmer style={{ height: 40 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          ISS position unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Coords>
        {fmtCoord(data.latitude, "lat")} · {fmtCoord(data.longitude, "lon")}
      </Coords>
      <Stats>
        <Stat>
          <Label>Altitude</Label>
          <Value>{data.altitude.toFixed(0)} km</Value>
        </Stat>
        <Stat>
          <Label>Velocity</Label>
          <Value>{data.velocity.toFixed(0)} km/h</Value>
        </Stat>
      </Stats>
    </Wrap>
  );
};

export default ISS;
