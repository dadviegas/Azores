import { useEffect, useState } from "react";
import { Icon, LoadingShimmer } from "@azores/ui";
import {
  useSource,
  WEATHER_SOURCE_NAME,
  type WeatherData,
  type WeatherParams,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Day,
  DayHigh,
  DayLabel,
  Forecast,
  Meta,
  Now,
  Temp,
  Wrap,
} from "./Weather.styles.js";

// Ponta Delgada — sensible default while we wait on geolocation, and a
// graceful fallback when the user denies the prompt.
const FALLBACK: WeatherParams = { lat: 37.7411, lng: -25.6856 };

const useGeolocation = (): WeatherParams => {
  const [coords, setCoords] = useState<WeatherParams>(FALLBACK);
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {
        /* leave fallback */
      },
      { timeout: 4_000, maximumAge: 30 * 60 * 1000 },
    );
  }, []);
  return coords;
};

// Open-Meteo weathercode → glyph + label. The list isn't exhaustive — picks
// covered cases that round to a sensible icon; everything else lands on the
// generic `cloud` glyph.
const codeToIcon = (code?: number): { icon: string; label: string } => {
  if (code == null) return { icon: "cloud", label: "—" };
  if (code === 0) return { icon: "sun", label: "Clear" };
  if (code <= 2) return { icon: "cloudsun", label: "Partly cloudy" };
  if (code === 3) return { icon: "cloud", label: "Overcast" };
  if (code <= 48) return { icon: "cloudfog", label: "Fog" };
  if (code <= 67) return { icon: "cloudrainwind", label: "Rain" };
  if (code <= 77) return { icon: "cloudsnow", label: "Snow" };
  if (code <= 82) return { icon: "cloudrainwind", label: "Showers" };
  if (code <= 99) return { icon: "cloudbolt", label: "Storm" };
  return { icon: "cloud", label: "—" };
};

const fmtDay = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { weekday: "short" });
};

export const Weather = ({ ttlMs }: WidgetProps): JSX.Element => {
  const params = useGeolocation();
  const { data, error, loading } = useSource<WeatherData>(
    WEATHER_SOURCE_NAME,
    params,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 36, width: "60%" }} />
        <LoadingShimmer style={{ height: 14, width: "40%" }} />
        <Forecast>
          {[0, 1, 2, 3].map((i) => (
            <LoadingShimmer key={i} style={{ height: 56 }} />
          ))}
        </Forecast>
      </Wrap>
    );
  }

  if (error || !data?.current_weather) {
    return (
      <Wrap>
        <Meta>—</Meta>
        <Meta style={{ color: "var(--az-coral-500)" }}>
          Weather unavailable. {error?.message ?? ""}
        </Meta>
      </Wrap>
    );
  }

  const { temperature, windspeed, weathercode } = data.current_weather;
  const cur = codeToIcon(weathercode);
  const days = data.daily?.time?.slice(0, 4) ?? [];

  return (
    <Wrap>
      <Now>
        <Icon name={cur.icon} size={32} />
        <Temp>{Math.round(temperature)}°</Temp>
        <Meta>
          {cur.label} · {Math.round(windspeed)} km/h
        </Meta>
      </Now>
      <Forecast>
        {days.map((iso, i) => {
          const max = data.daily?.temperature_2m_max?.[i];
          const code = data.daily?.weathercode?.[i];
          const day = codeToIcon(code);
          return (
            <Day key={iso}>
              <DayLabel>{fmtDay(iso)}</DayLabel>
              <Icon name={day.icon} size={16} />
              <DayHigh>{max != null ? `${Math.round(max)}°` : "—"}</DayHigh>
            </Day>
          );
        })}
      </Forecast>
    </Wrap>
  );
};

export default Weather;
