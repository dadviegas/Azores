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
export {
  hackerNewsSource,
  HACKERNEWS_SOURCE_NAME,
  type HackerNewsParams,
  type HackerNewsData,
  type HackerNewsHit,
} from "./azores-external-hackernews/source.js";
export {
  coinGeckoSource,
  COINGECKO_SOURCE_NAME,
  type CoinGeckoParams,
  type CoinGeckoData,
  type Coin,
} from "./azores-external-coingecko/source.js";
export {
  gitHubSource,
  GITHUB_SOURCE_NAME,
  type GitHubTrendingParams,
  type GitHubTrendingData,
  type GitHubRepo,
} from "./azores-external-github/source.js";
export {
  quotesSource,
  QUOTES_SOURCE_NAME,
  type QuoteParams,
  type QuoteData,
} from "./azores-external-quotes/source.js";
export {
  issSource,
  ISS_SOURCE_NAME,
  type IssParams,
  type IssData,
} from "./azores-external-iss/source.js";
export {
  onThisDaySource,
  ONTHISDAY_SOURCE_NAME,
  type OnThisDayParams,
  type OnThisDayData,
  type OnThisDayEvent,
  type OnThisDayPage,
} from "./azores-external-onthisday/source.js";
export {
  airQualitySource,
  AIRQUALITY_SOURCE_NAME,
  type AirQualityParams,
  type AirQualityData,
} from "./azores-external-airquality/source.js";
export {
  holidaysSource,
  HOLIDAYS_SOURCE_NAME,
  type HolidaysParams,
  type HolidaysData,
  type Holiday,
} from "./azores-external-holidays/source.js";
export {
  sunriseSource,
  SUNRISE_SOURCE_NAME,
  type SunriseParams,
  type SunriseData,
} from "./azores-external-sunrise/source.js";
export {
  catFactSource,
  CATFACT_SOURCE_NAME,
  type CatFactParams,
  type CatFactData,
} from "./azores-external-catfact/source.js";
export {
  jokeSource,
  JOKE_SOURCE_NAME,
  type JokeParams,
  type JokeData,
} from "./azores-external-joke/source.js";
export {
  npmSource,
  NPM_SOURCE_NAME,
  type NpmParams,
  type NpmData,
} from "./azores-external-npm/source.js";
export {
  auroraSource,
  AURORA_SOURCE_NAME,
  type AuroraParams,
  type AuroraData,
  type AuroraRow,
} from "./azores-external-aurora/source.js";
export {
  mempoolSource,
  MEMPOOL_SOURCE_NAME,
  type MempoolParams,
  type MempoolFees,
} from "./azores-external-mempool/source.js";
export {
  wikiFeaturedSource,
  WIKIFEATURED_SOURCE_NAME,
  type WikiFeaturedParams,
  type WikiFeaturedData,
  type WikiFeaturedSummary,
} from "./azores-external-wikifeatured/source.js";
export {
  adviceSource,
  ADVICE_SOURCE_NAME,
  type AdviceParams,
  type AdviceData,
} from "./azores-external-advice/source.js";
export {
  gitHubRepoSource,
  GITHUBREPO_SOURCE_NAME,
  type GitHubRepoParams,
  type GitHubRepoData,
} from "./azores-external-githubrepo/source.js";
export {
  ipInfoSource,
  IPINFO_SOURCE_NAME,
  type IpInfoParams,
  type IpInfoData,
} from "./azores-external-ipinfo/source.js";
export {
  gitHubStatusSource,
  GITHUBSTATUS_SOURCE_NAME,
  type GitHubStatusParams,
  type GitHubStatusData,
  type StatusComponent,
} from "./azores-external-githubstatus/source.js";
export {
  apodSource,
  APOD_SOURCE_NAME,
  type ApodParams,
  type ApodData,
} from "./azores-external-apod/source.js";
export {
  cocktailSource,
  COCKTAIL_SOURCE_NAME,
  type CocktailParams,
  type CocktailData,
  type CocktailDrink,
} from "./azores-external-cocktail/source.js";
export {
  mealSource,
  MEAL_SOURCE_NAME,
  type MealParams,
  type MealData,
  type MealItem,
} from "./azores-external-meal/source.js";
export {
  dogSource,
  DOG_SOURCE_NAME,
  type DogParams,
  type DogData,
} from "./azores-external-dog/source.js";
export {
  triviaSource,
  TRIVIA_SOURCE_NAME,
  type TriviaParams,
  type TriviaData,
  type TriviaQuestion,
} from "./azores-external-trivia/source.js";
