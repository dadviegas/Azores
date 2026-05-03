import { LoadingShimmer } from "@azores/ui";
import {
  GITHUBREPO_SOURCE_NAME,
  useSource,
  type GitHubRepoData,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Empty,
  Label,
  Repo,
  Stat,
  Stats,
  Value,
  Wrap,
} from "./GitHubRepo.styles.js";

const fmt = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString("en-US");
};

export const GitHubRepo = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<GitHubRepoData>(
    GITHUBREPO_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 16, width: "50%" }} />
        <LoadingShimmer style={{ height: 40 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          GitHub repo unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Repo href={data.html_url} target="_blank" rel="noopener">
        {data.full_name}
      </Repo>
      <Stats>
        <Stat>
          <Label>Stars</Label>
          <Value>{fmt(data.stargazers_count)}</Value>
        </Stat>
        <Stat>
          <Label>Forks</Label>
          <Value>{fmt(data.forks_count)}</Value>
        </Stat>
        <Stat>
          <Label>Issues</Label>
          <Value>{fmt(data.open_issues_count)}</Value>
        </Stat>
      </Stats>
    </Wrap>
  );
};

export default GitHubRepo;
