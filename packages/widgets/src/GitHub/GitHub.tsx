import { LoadingShimmer } from "@azores/ui";
import {
  GITHUB_SOURCE_NAME,
  useSource,
  type GitHubTrendingData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Description,
  Empty,
  Header,
  Item,
  Lang,
  List,
  Repo,
  Stars,
  Wrap,
} from "./GitHub.styles.js";

const PARAMS = { perPage: 8 };

const fmtStars = (n: number): string => {
  if (n >= 1000) return `★ ${(n / 1000).toFixed(1)}k`;
  return `★ ${n}`;
};

export const GitHub = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<GitHubTrendingData>(
    GITHUB_SOURCE_NAME,
    PARAMS,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <List>
          {[0, 1, 2, 3].map((i) => (
            <Item key={i}>
              <LoadingShimmer style={{ height: 14, width: "60%" }} />
              <LoadingShimmer style={{ height: 10, width: "90%", marginTop: 4 }} />
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
          GitHub unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <List>
        {data.items.map((repo) => (
          <Item key={repo.id}>
            <Header>
              <Repo href={repo.html_url} target="_blank" rel="noopener">
                {repo.full_name}
              </Repo>
              <Stars>{fmtStars(repo.stargazers_count)}</Stars>
            </Header>
            {repo.description ? <Description>{repo.description}</Description> : null}
            {repo.language ? <Lang>{repo.language}</Lang> : null}
          </Item>
        ))}
      </List>
    </Wrap>
  );
};

export default GitHub;
