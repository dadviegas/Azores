import { LoadingShimmer } from "@azores/ui";
import {
  HACKERNEWS_SOURCE_NAME,
  useSource,
  type HackerNewsData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import { Empty, Item, List, Meta, Title, Wrap } from "./HackerNews.styles.js";

const PARAMS = { tag: "front_page" as const, hits: 12 };

const itemUrl = (objectID: string, url: string | null): string =>
  url ?? `https://news.ycombinator.com/item?id=${objectID}`;

export const HackerNews = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<HackerNewsData>(
    HACKERNEWS_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <List>
          {[0, 1, 2, 3, 4].map((i) => (
            <Item key={i}>
              <LoadingShimmer style={{ height: 14, width: "85%" }} />
              <LoadingShimmer style={{ height: 10, width: "40%" }} />
            </Item>
          ))}
        </List>
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          Hacker News unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  if (data.hits.length === 0) {
    return (
      <Wrap>
        <Empty>No stories.</Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <List>
        {data.hits.map((hit) => (
          <Item key={hit.objectID}>
            <Title href={itemUrl(hit.objectID, hit.url)} target="_blank" rel="noopener">
              {hit.title}
            </Title>
            <Meta>
              {hit.points} pts · {hit.num_comments} comments · {hit.author}
            </Meta>
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export default HackerNews;
