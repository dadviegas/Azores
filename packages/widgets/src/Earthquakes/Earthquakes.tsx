import { LoadingShimmer } from "@azores/ui";
import {
  EARTHQUAKES_SOURCE_NAME,
  useSource,
  type EarthquakeData,
  type EarthquakeParams,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Header,
  List,
  Mag,
  Place,
  Row,
  When,
  Wrap,
} from "./Earthquakes.styles.js";

const PARAMS: EarthquakeParams = {
  starttime: new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10),
  minmagnitude: 4.5,
  orderby: "time",
  limit: 20,
};

const severity = (mag: number | null): "low" | "med" | "high" => {
  if (mag == null) return "low";
  if (mag >= 6) return "high";
  if (mag >= 5) return "med";
  return "low";
};

const formatWhen = (epochMs: number): string => {
  const d = new Date(epochMs);
  const diffMin = Math.round((Date.now() - epochMs) / 60_000);
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 60 * 24) return `${Math.round(diffMin / 60)}h ago`;
  return d.toISOString().slice(0, 10);
};

export const Earthquakes = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<EarthquakeData>(
    EARTHQUAKES_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <Header>
          <span>USGS · last 24h · M 4.5+</span>
          <span>—</span>
        </Header>
        <List>
          {[0, 1, 2, 3, 4].map((i) => (
            <LoadingShimmer key={i} style={{ height: 36 }} />
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Header style={{ color: "var(--az-coral-500)" }}>
          Earthquakes unavailable. {error?.message ?? "—"}
        </Header>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Header>
        <span>USGS · last 24h · M 4.5+</span>
        <span>{data.features.length} events</span>
      </Header>
      <List>
        {data.features.map((f) => (
          <Row key={f.id}>
            <Mag severity={severity(f.properties.mag)}>
              {f.properties.mag != null ? f.properties.mag.toFixed(1) : "?"}
            </Mag>
            <Place title={f.properties.place ?? ""}>
              {f.properties.place ?? "Unknown"}
            </Place>
            <When dateTime={new Date(f.properties.time).toISOString()}>
              {formatWhen(f.properties.time)}
            </When>
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default Earthquakes;
