import { LoadingShimmer } from "@azores/ui";
import {
  WIKIFEATURED_SOURCE_NAME,
  useSource,
  type WikiFeaturedData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Body,
  Empty,
  Extract,
  Link,
  Thumb,
  Title,
  Wrap,
} from "./WikiFeatured.styles.js";

export const WikiFeatured = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<WikiFeaturedData>(
    WIKIFEATURED_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ width: 96, height: 96 }} />
        <Body>
          <LoadingShimmer style={{ height: 14, width: "60%" }} />
          <LoadingShimmer style={{ height: 60 }} />
        </Body>
      </Wrap>
    );
  }

  const tfa = data?.tfa;

  if (error || !tfa) {
    return (
      <Wrap>
        <Body>
          <Empty style={{ color: "var(--az-coral-500)" }}>
            Featured article unavailable. {error?.message ?? "—"}
          </Empty>
        </Body>
      </Wrap>
    );
  }

  return (
    <Wrap>
      {tfa.thumbnail ? <Thumb src={tfa.thumbnail.source} alt="" /> : null}
      <Body>
        <Title>{tfa.title.replace(/_/g, " ")}</Title>
        <Extract>{tfa.extract}</Extract>
        {tfa.content_urls?.desktop.page ? (
          <Link href={tfa.content_urls.desktop.page} target="_blank" rel="noopener">
            Read on Wikipedia →
          </Link>
        ) : null}
      </Body>
    </Wrap>
  );
};

export default WikiFeatured;
