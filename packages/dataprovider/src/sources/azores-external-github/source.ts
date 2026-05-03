import { registerSource, type Source } from "@azores/core";

// "Trending" isn't an official endpoint. We approximate with a starred-this-week
// search: repos created in the last 7 days, ordered by stars. Cheap, public,
// and CORS-friendly.
export type GitHubTrendingParams = { language?: string; perPage?: number };

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: { login: string; avatar_url: string };
};

export type GitHubTrendingData = { items: GitHubRepo[] };

export const GITHUB_SOURCE_NAME = "azores-external-github";

const sevenDaysAgoIso = (): string => {
  const d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
};

export const gitHubSource: Source<GitHubTrendingParams, GitHubTrendingData> = {
  name: GITHUB_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: ({ language, perPage = 10 } = {}) => {
    const langQ = language ? `+language:${encodeURIComponent(language)}` : "";
    const q = `created:>${sevenDaysAgoIso()}${langQ}`;
    return (
      `https://api.github.com/search/repositories?q=${q}` +
      `&sort=stars&order=desc&per_page=${perPage}`
    );
  },
};

registerSource(gitHubSource);
