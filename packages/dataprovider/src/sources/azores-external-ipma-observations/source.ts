import { registerSource, type Source } from "@azores/core";

// IPMA hourly observations across all stations. Top-level keys are ISO
// datetimes (UTC); values are keyed by stringified station id. Missing
// readings come back as -99 — callers must guard.

export type IpmaObservation = {
  intensidadeVentoKM: number;
  temperatura: number;
  idDireccVento: number;
  precAcumulada: number;
  humidade: number;
  pressao: number;
  radiacao: number;
};

// { "2026-05-01T08:00": { "1210702": { …obs }, … }, … }
export type IpmaObservations = Record<string, Record<string, IpmaObservation | null>>;

export const IPMA_OBSERVATIONS_SOURCE_NAME = "azores-external-ipma-observations";

export const ipmaObservationsSource: Source<undefined, IpmaObservations> = {
  name: IPMA_OBSERVATIONS_SOURCE_NAME,
  ttlMs: 10 * 60 * 1000,
  build: () =>
    "https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json",
};

registerSource(ipmaObservationsSource);
