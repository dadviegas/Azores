import { registerSource, type Source } from "@azores/core";

export type GitHubRepoParams = { owner?: string; repo?: string };

export type GitHubRepoData = {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  html_url: string;
  pushed_at: string;
};

export const GITHUBREPO_SOURCE_NAME = "azores-external-githubrepo";

export const gitHubRepoSource: Source<GitHubRepoParams, GitHubRepoData> = {
  name: GITHUBREPO_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: ({ owner = "facebook", repo = "react" } = {}) =>
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
};

registerSource(gitHubRepoSource);
