import { registerSource, type Source } from "@azores/core";

export type CountriesParams = void;
export type Country = {
  name: { common: string; official: string };
  cca2: string;
  capital?: string[];
  population: number;
  flag: string;
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
};

export const COUNTRIES_SOURCE_NAME = "azores-external-countries";

export const countriesSource: Source<CountriesParams, Country[]> = {
  name: COUNTRIES_SOURCE_NAME,
  ttlMs: 24 * 60 * 60 * 1000,
  build: () =>
    "https://restcountries.com/v3.1/all?fields=name,cca2,capital,population,flag,currencies,languages",
};

registerSource(countriesSource);
