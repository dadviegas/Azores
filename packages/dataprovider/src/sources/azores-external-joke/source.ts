import { registerSource, type Source } from "@azores/core";

export type JokeParams = Record<string, never>;

export type JokeData = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

export const JOKE_SOURCE_NAME = "azores-external-joke";

export const jokeSource: Source<JokeParams, JokeData> = {
  name: JOKE_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: () => "https://official-joke-api.appspot.com/random_joke",
};

registerSource(jokeSource);
