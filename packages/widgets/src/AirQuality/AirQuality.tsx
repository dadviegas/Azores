import { LoadingShimmer } from "@azores/ui";
import {
  AIRQUALITY_SOURCE_NAME,
  useSource,
  type AirQualityData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Aqi,
  Band,
  Big,
  Empty,
  Label,
  Stat,
  Stats,
  Value,
  Wrap,
} from "./AirQuality.styles.js";

// European AQI bands per the Open-Meteo / EEA scale.
const bandFor = (aqi: number): { label: string; color: string } => {
  if (aqi <= 20) return { label: "Good", color: "var(--az-success-500, #2a9d8f)" };
  if (aqi <= 40) return { label: "Fair", color: "var(--az-ocean-500)" };
  if (aqi <= 60) return { label: "Moderate", color: "var(--az-honey-500, #e9c46a)" };
  if (aqi <= 80) return { label: "Poor", color: "var(--az-orange-500, #f4a261)" };
  if (aqi <= 100) return { label: "Very poor", color: "var(--az-coral-500)" };
  return { label: "Extreme", color: "var(--az-lava-500)" };
};

export const AirQuality = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<AirQualityData>(
    AIRQUALITY_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 36, width: "60%" }} />
        <LoadingShimmer style={{ height: 24 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Air quality unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  const aqi = data.current.european_aqi;
  const b = bandFor(aqi);

  return (
    <Wrap>
      <Big>
        <Aqi band={b.color}>{Math.round(aqi)}</Aqi>
        <Band band={b.color}>{b.label}</Band>
      </Big>
      <Stats>
        <Stat>
          <Label>PM2.5</Label>
          <Value>{data.current.pm2_5.toFixed(1)} µg/m³</Value>
        </Stat>
        <Stat>
          <Label>PM10</Label>
          <Value>{data.current.pm10.toFixed(1)} µg/m³</Value>
        </Stat>
      </Stats>
    </Wrap>
  );
};

export default AirQuality;
