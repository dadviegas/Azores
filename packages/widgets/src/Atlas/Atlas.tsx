import { useEffect, useState } from "react";
import { LoadingShimmer } from "@azores/ui";
import {
  COUNTRIES_SOURCE_NAME,
  useSource,
  type Country,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  CountryMeta,
  CountryName,
  Flag,
  Hero,
  NameBlock,
  Stat,
  StatLabel,
  StatValue,
  Stats,
  Wrap,
} from "./Atlas.styles.js";

const ROTATION_MS = 60_000;

const fmt = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
};

export const Atlas = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<Country[]>(
    COUNTRIES_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!data?.length) return;
    setIdx(Math.floor(Math.random() * data.length));
    const tick = setInterval(() => {
      setIdx((i) => (i + 1) % data.length);
    }, ROTATION_MS);
    return () => clearInterval(tick);
  }, [data]);

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 48, width: "60%" }} />
        <Stats>
          {[0, 1, 2, 3].map((i) => (
            <LoadingShimmer key={i} style={{ height: 36 }} />
          ))}
        </Stats>
      </Wrap>
    );
  }

  if (error || !data?.length) {
    return (
      <Wrap>
        <CountryMeta style={{ color: "var(--az-coral-500)" }}>
          Atlas unavailable. {error?.message ?? "—"}
        </CountryMeta>
      </Wrap>
    );
  }

  const country = data[idx];
  if (!country) return <Wrap />;

  const cap = country.capital?.[0] ?? "—";
  const lang = country.languages
    ? Object.values(country.languages).slice(0, 2).join(", ")
    : "—";
  const cur = country.currencies
    ? Object.entries(country.currencies)
        .slice(0, 1)
        .map(([code, c]) => `${code}${c.symbol ? ` ${c.symbol}` : ""}`)
        .join("")
    : "—";

  return (
    <Wrap>
      <Hero>
        <Flag>{country.flag}</Flag>
        <NameBlock>
          <CountryName>{country.name.common}</CountryName>
          <CountryMeta>{cap}</CountryMeta>
        </NameBlock>
      </Hero>
      <Stats>
        <Stat>
          <StatLabel>Population</StatLabel>
          <StatValue>{fmt(country.population)}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Code</StatLabel>
          <StatValue>{country.cca2}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Currency</StatLabel>
          <StatValue>{cur}</StatValue>
        </Stat>
        <Stat>
          <StatLabel>Languages</StatLabel>
          <StatValue style={{ fontSize: 11, fontFamily: "inherit", fontWeight: 500 }}>
            {lang}
          </StatValue>
        </Stat>
      </Stats>
    </Wrap>
  );
};

export default Atlas;
