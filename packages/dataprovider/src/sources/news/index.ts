// News-category sources. Each provider lives in its own folder and
// self-registers via `registerSource` on import.

export {
  earthquakesSource,
  EARTHQUAKES_SOURCE_NAME,
  type EarthquakeParams,
  type EarthquakeData,
  type EarthquakeFeature,
} from "./azores-external-earthquakes/source.js";
export {
  rssSource,
  RSS_SOURCE_NAME,
  type RssParams,
} from "./azores-external-rss/source.js";
export { parseRss, type RssFeed, type RssItem } from "../../rss.js";
