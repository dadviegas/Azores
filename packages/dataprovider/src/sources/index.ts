// Eagerly registers every built-in source. Importing this barrel from the
// app entry (or from `@azores/dataprovider`) is enough to make every source
// available to a Fetcher's allowlist. Side-effectful by design.

export {
  weatherSource,
  WEATHER_SOURCE_NAME,
  type WeatherParams,
  type WeatherData,
} from "./azores-external-weather/source.js";
export {
  countriesSource,
  COUNTRIES_SOURCE_NAME,
  type CountriesParams,
  type Country,
} from "./azores-external-countries/source.js";
export {
  wikipediaSource,
  WIKIPEDIA_SOURCE_NAME,
  type WikipediaParams,
  type WikipediaSummary,
} from "./azores-external-wikipedia/source.js";
export {
  fxSource,
  FX_SOURCE_NAME,
  type FxParams,
  type FxRates,
} from "./azores-external-fx/source.js";
export {
  ipmaStationsSource,
  IPMA_STATIONS_SOURCE_NAME,
  type IpmaStations,
  type IpmaStationFeature,
} from "./azores-external-ipma-stations/source.js";
export {
  ipmaObservationsSource,
  IPMA_OBSERVATIONS_SOURCE_NAME,
  type IpmaObservations,
  type IpmaObservation,
} from "./azores-external-ipma-observations/source.js";
export {
  worldBankSource,
  WORLDBANK_SOURCE_NAME,
  type WorldBankParams,
  type WorldBankRow,
  type WorldBankMeta,
  type WorldBankSeries,
} from "./azores-external-worldbank/source.js";
export * from "./news/index.js";
