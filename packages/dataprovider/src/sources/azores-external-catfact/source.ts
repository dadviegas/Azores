import { registerSource, type Source } from "@azores/core";

export type CatFactParams = Record<string, never>;

export type CatFactData = { fact: string; length: number };

export const CATFACT_SOURCE_NAME = "azores-external-catfact";

export const catFactSource: Source<CatFactParams, CatFactData> = {
  name: CATFACT_SOURCE_NAME,
  ttlMs: 60 * 60 * 1000,
  build: () => "https://catfact.ninja/fact",
};

registerSource(catFactSource);
