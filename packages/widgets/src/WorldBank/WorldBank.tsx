import { LoadingShimmer } from "@azores/ui";
import {
  WORLDBANK_SOURCE_NAME,
  useSource,
  type WorldBankParams,
  type WorldBankSeries,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Cell,
  Header,
  Latest,
  LatestMeta,
  LatestValue,
  Series,
  Title,
  Value,
  Wrap,
  Year,
} from "./WorldBank.styles.js";

type WorldBankConfig = {
  country?: string;
  indicator?: string;
  title?: string;
  // Year range, e.g. "2015:2024". Defaults to the last 10 reported years.
  date?: string;
};

const DEFAULT_INDICATOR = "NY.GDP.MKTP.CD"; // GDP, current US$
const DEFAULT_COUNTRY = "PT";

const readConfig = (data: unknown): WorldBankConfig => {
  if (!data || typeof data !== "object") return {};
  const { country, indicator, title, date } = data as Record<string, unknown>;
  return {
    country: typeof country === "string" ? country : undefined,
    indicator: typeof indicator === "string" ? indicator : undefined,
    title: typeof title === "string" ? title : undefined,
    date: typeof date === "string" ? date : undefined,
  };
};

// World Bank values span many orders of magnitude (people, $, %) so use
// SI suffixes for anything ≥1e3 and keep small values readable.
const formatValue = (v: number | null): string => {
  if (v == null || Number.isNaN(v)) return "—";
  const abs = Math.abs(v);
  if (abs >= 1e12) return `${(v / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(v / 1e3).toFixed(2)}k`;
  if (abs >= 1) return v.toFixed(2);
  return v.toFixed(3);
};

export const WorldBank = ({
  ttlMs,
  data: instanceData,
}: WidgetProps): JSX.Element => {
  const cfg = readConfig(instanceData);
  const params: WorldBankParams = {
    country: cfg.country ?? DEFAULT_COUNTRY,
    indicator: cfg.indicator ?? DEFAULT_INDICATOR,
    date: cfg.date,
    perPage: 60,
  };

  const { data, error, loading } = useSource<WorldBankSeries>(
    WORLDBANK_SOURCE_NAME,
    params,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <Header>
          <Title>{cfg.title ?? "Loading…"}</Title>
          <span>—</span>
        </Header>
        <LoadingShimmer style={{ height: 64 }} />
        <Series>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <LoadingShimmer key={i} style={{ height: 36 }} />
          ))}
        </Series>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Header style={{ color: "var(--az-coral-500)" }}>
          World Bank unavailable. {error?.message ?? "—"}
        </Header>
      </Wrap>
    );
  }

  const reported = data.rows.filter((r) => r.value != null);
  const latest = reported[0];
  const indicatorName = data.rows[0]?.indicator.value ?? cfg.indicator ?? "";
  const countryName = data.rows[0]?.country.value ?? cfg.country ?? "";
  const headerLeft = cfg.title ?? `${countryName} · ${indicatorName}`;
  // Newest-first from the API; reverse for left-to-right time order in the strip.
  const strip = [...reported].slice(0, 8).reverse();

  return (
    <Wrap>
      <Header>
        <Title title={headerLeft}>{headerLeft}</Title>
        <span>{reported.length} yrs</span>
      </Header>
      {latest ? (
        <Latest>
          <LatestValue>{formatValue(latest.value)}</LatestValue>
          <LatestMeta>
            {latest.date}
            {latest.unit ? ` · ${latest.unit}` : ""}
          </LatestMeta>
        </Latest>
      ) : null}
      <Series>
        {strip.map((r) => (
          <Cell key={r.date}>
            <Year>{r.date}</Year>
            <Value>{formatValue(r.value)}</Value>
          </Cell>
        ))}
      </Series>
    </Wrap>
  );
};

export default WorldBank;
