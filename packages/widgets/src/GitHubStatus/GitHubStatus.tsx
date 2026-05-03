import { LoadingShimmer } from "@azores/ui";
import {
  GITHUBSTATUS_SOURCE_NAME,
  useSource,
  type GitHubStatusData,
  type StatusComponent,
} from "@azores/dataprovider";
import type { WidgetProps } from "../widget.js";
import {
  Banner,
  Dot,
  Empty,
  List,
  Name,
  Row,
  State,
  Wrap,
} from "./GitHubStatus.styles.js";

const indicatorColor = (
  i: GitHubStatusData["status"]["indicator"],
): string => {
  switch (i) {
    case "none":
      return "var(--az-success-500, #2a9d8f)";
    case "minor":
      return "var(--az-honey-500, #e9c46a)";
    case "major":
      return "var(--az-coral-500)";
    case "critical":
      return "var(--az-lava-500)";
  }
};

const componentColor = (s: StatusComponent["status"]): string => {
  if (s === "operational") return "var(--az-success-500, #2a9d8f)";
  if (s === "degraded_performance") return "var(--az-honey-500, #e9c46a)";
  if (s === "under_maintenance") return "var(--az-ocean-500)";
  if (s === "partial_outage") return "var(--az-coral-500)";
  return "var(--az-lava-500)";
};

const fmtState = (s: string): string => s.replace(/_/g, " ");

export const GitHubStatus = ({ ttlMs }: WidgetProps): JSX.Element => {
  const { data, error, loading } = useSource<GitHubStatusData>(
    GITHUBSTATUS_SOURCE_NAME,
    undefined,
    ttlMs != null ? { ttlMs } : undefined,
  );

  if (loading && !data) {
    return (
      <Wrap>
        <LoadingShimmer style={{ height: 36 }} />
        <LoadingShimmer style={{ height: 80 }} />
      </Wrap>
    );
  }

  if (error || !data) {
    return (
      <Wrap>
        <Empty style={{ color: "var(--az-coral-500)" }}>
          GitHub status unavailable. {error?.message ?? "—"}
        </Empty>
      </Wrap>
    );
  }

  const banner = indicatorColor(data.status.indicator);
  // Hide the duplicated visibility-only sub-components.
  const components = data.components.filter((c) => !c.id.startsWith("group_"));

  return (
    <Wrap>
      <Banner band={banner}>
        <Dot band={banner} />
        {data.status.description}
      </Banner>
      <List>
        {components.slice(0, 8).map((c) => (
          <Row key={c.id}>
            <Dot band={componentColor(c.status)} />
            <Name>{c.name}</Name>
            <State>{fmtState(c.status)}</State>
          </Row>
        ))}
      </List>
    </Wrap>
  );
};

export default GitHubStatus;
