// Tiny RSS 2.0 + Atom parser for browser-side use. Returns a uniform
// shape so widgets don't care which dialect a feed speaks.
//
// Browser-only: relies on DOMParser. If we ever need this server-side,
// swap in fast-xml-parser behind the same return type.

export type RssItem = {
  title: string;
  link: string;
  // ISO-8601 when the feed provides a parseable date, else undefined.
  published?: string;
  summary?: string;
  id?: string;
};

export type RssFeed = {
  title: string;
  link?: string;
  description?: string;
  items: RssItem[];
};

const text = (el: Element | null | undefined): string | undefined => {
  if (!el) return undefined;
  const value = el.textContent?.trim();
  return value && value.length > 0 ? value : undefined;
};

const atomLink = (entry: Element): string | undefined => {
  // Prefer rel="alternate" with text/html; fall back to first <link>.
  const links = Array.from(entry.getElementsByTagName("link"));
  const alt = links.find(
    (l) => (l.getAttribute("rel") ?? "alternate") === "alternate",
  );
  return (alt ?? links[0])?.getAttribute("href") ?? undefined;
};

const toIso = (raw: string | undefined): string | undefined => {
  if (!raw) return undefined;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

export const parseRss = (xml: string): RssFeed => {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("parseRss: malformed XML");
  }

  const rssChannel = doc.querySelector("rss > channel");
  if (rssChannel) {
    const items = Array.from(rssChannel.getElementsByTagName("item")).map(
      (item): RssItem => ({
        title: text(item.querySelector("title")) ?? "(untitled)",
        link: text(item.querySelector("link")) ?? "",
        published: toIso(text(item.querySelector("pubDate"))),
        summary: text(item.querySelector("description")),
        id: text(item.querySelector("guid")),
      }),
    );
    return {
      title: text(rssChannel.querySelector("title")) ?? "",
      link: text(rssChannel.querySelector("link")),
      description: text(rssChannel.querySelector("description")),
      items,
    };
  }

  const atomFeed = doc.querySelector("feed");
  if (atomFeed) {
    const items = Array.from(atomFeed.getElementsByTagName("entry")).map(
      (entry): RssItem => ({
        title: text(entry.querySelector("title")) ?? "(untitled)",
        link: atomLink(entry) ?? "",
        published: toIso(
          text(entry.querySelector("updated")) ??
            text(entry.querySelector("published")),
        ),
        summary:
          text(entry.querySelector("summary")) ??
          text(entry.querySelector("content")),
        id: text(entry.querySelector("id")),
      }),
    );
    return {
      title: text(atomFeed.querySelector("title")) ?? "",
      link: atomFeed.querySelector("link")?.getAttribute("href") ?? undefined,
      items,
    };
  }

  throw new Error("parseRss: not an RSS 2.0 or Atom document");
};
