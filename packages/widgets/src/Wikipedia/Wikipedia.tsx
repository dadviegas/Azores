import { useState } from "react";
import { LoadingShimmer } from "@azores/ui";
import {
  WIKIPEDIA_SOURCE_NAME,
  useSource,
  type WikipediaSummary,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Body,
  Description,
  Extract,
  Link,
  Thumb,
  ThumbPlaceholder,
  Title,
  Wrap,
} from "./Wikipedia.styles.js";

// Curated list. Random pick on each mount; refresh action re-rolls via
// `useSource.refresh` (force-refresh bypasses cache for the picked title).
const TITLES = [
  "Azores",
  "Octopus",
  "Photovoltaics",
  "Sextant",
  "Lighthouse",
  "Mid-Atlantic_Ridge",
  "Lava_tube",
  "Subduction",
  "Solar_eclipse",
  "Caldera",
];

const pickTitle = (): string => {
  const t = TITLES[Math.floor(Math.random() * TITLES.length)];
  return t ?? "Azores";
};

export const Wikipedia = ({ ttlMs }: WidgetProps): JSX.Element => {
  const [title] = useState<string>(() => pickTitle());
  const { data, error, loading } = useSource<WikipediaSummary>(
    WIKIPEDIA_SOURCE_NAME,
    { title },
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <ThumbPlaceholder />
        <Body>
          <LoadingShimmer style={{ height: 14, width: "60%" }} />
          <LoadingShimmer style={{ height: 10, width: "40%" }} />
          <LoadingShimmer style={{ height: 48 }} />
        </Body>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Body>
          <Description style={{ color: "var(--az-coral-500)" }}>
            Wikipedia unavailable
          </Description>
          <Extract>{error?.message ?? "No data."}</Extract>
        </Body>
      </Wrap>
    );
  }

  return (
    <Wrap>
      {data.thumbnail ? (
        <Thumb src={data.thumbnail.source} alt="" />
      ) : (
        <ThumbPlaceholder />
      )}
      <Body>
        <Title>{data.title}</Title>
        {data.description ? <Description>{data.description}</Description> : null}
        <Extract>{data.extract}</Extract>
        {data.content_urls?.desktop.page ? (
          <Link href={data.content_urls.desktop.page} target="_blank" rel="noopener">
            Read on Wikipedia →
          </Link>
        ) : null}
      </Body>
    </Wrap>
  );
};

export default Wikipedia;
