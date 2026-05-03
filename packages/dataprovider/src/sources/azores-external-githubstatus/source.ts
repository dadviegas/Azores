import { registerSource, type Source } from "@azores/core";

export type GitHubStatusParams = Record<string, never>;

export type StatusComponent = {
  id: string;
  name: string;
  status:
    | "operational"
    | "degraded_performance"
    | "partial_outage"
    | "major_outage"
    | "under_maintenance";
};

export type GitHubStatusData = {
  status: { description: string; indicator: "none" | "minor" | "major" | "critical" };
  components: StatusComponent[];
};

export const GITHUBSTATUS_SOURCE_NAME = "azores-external-githubstatus";

export const gitHubStatusSource: Source<GitHubStatusParams, GitHubStatusData> = {
  name: GITHUBSTATUS_SOURCE_NAME,
  ttlMs: 5 * 60 * 1000,
  build: () => "https://www.githubstatus.com/api/v2/summary.json",
};

registerSource(gitHubStatusSource);
