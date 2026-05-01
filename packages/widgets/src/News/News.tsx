import { LoadingShimmer } from "@azores/ui";
import {
  RSS_SOURCE_NAME,
  useSource,
  type RssFeed,
  type RssParams,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  FeedTitle,
  Header,
  Item,
  ItemLink,
  List,
  Meta,
  Wrap,
} from "./News.styles.js";

// USGS hourly significant-earthquakes Atom feed — picked as a default
// because it's CORS-friendly. Override per-instance via DashboardWidget.data.
const DEFAULT_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.atom";

type NewsConfig = { url?: string; title?: string };

const readConfig = (data: unknown): NewsConfig => {
  if (!data || typeof data !== "object") return {};
  const { url, title } = data as Record<string, unknown>;
  return {
    url: typeof url === "string" ? url : undefined,
    title: typeof title === "string" ? title : undefined,
  };
};

const formatWhen = (iso: string | undefined): string => {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const diffMin = Math.round((Date.now() - t) / 60_000);
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffMin < 60 * 24) return `${Math.round(diffMin / 60)}h ago`;
  return new Date(t).toISOString().slice(0, 10);
};

export const News = ({ ttlMs, data: instanceData }: WidgetProps): JSX.Element => {
  const cfg = readConfig(instanceData);
  const params: RssParams = { url: cfg.url ?? DEFAULT_URL };

  const { data, error, loading } = useSource<RssFeed>(
    RSS_SOURCE_NAME,
    params,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <Header>
          <FeedTitle>{cfg.title ?? "Loading…"}</FeedTitle>
        </Header>
        <List>
          {[0, 1, 2, 3].map((i) => (
            <LoadingShimmer key={i} style={{ height: 44 }} />
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Header style={{ color: "var(--az-coral-500)" }}>
          Feed unavailable. {error?.message ?? "—"}
        </Header>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Header>
        <FeedTitle title={cfg.title ?? data.title}>
          {cfg.title ?? data.title}
        </FeedTitle>
        <span>{data.items.length}</span>
      </Header>
      <List>
        {data.items.slice(0, 12).map((item, i) => (
          <Item key={item.id ?? item.link ?? i}>
            <ItemLink href={item.link} target="_blank" rel="noopener">
              {item.title}
            </ItemLink>
            {item.published ? <Meta>{formatWhen(item.published)}</Meta> : null}
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export default News;
