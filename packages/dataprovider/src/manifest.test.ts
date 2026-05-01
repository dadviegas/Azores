import { describe, expect, it } from "vitest";
import { parseDurationMs, parseWidgetManifest, parseSourceManifest } from "./manifest.js";

describe("parseDurationMs", () => {
  it("parses humanised durations", () => {
    expect(parseDurationMs("30m")).toBe(1_800_000);
    expect(parseDurationMs("2h")).toBe(7_200_000);
    expect(parseDurationMs("45s")).toBe(45_000);
    expect(parseDurationMs("500ms")).toBe(500);
    expect(parseDurationMs("1d")).toBe(86_400_000);
  });

  it("accepts raw ms numbers", () => {
    expect(parseDurationMs(1500)).toBe(1500);
  });

  it("throws on garbage", () => {
    expect(() => parseDurationMs("nope")).toThrow();
    expect(() => parseDurationMs("10x")).toThrow();
    expect(() => parseDurationMs(-1)).toThrow();
  });
});

describe("parseWidgetManifest", () => {
  it("validates required fields", () => {
    const m = parseWidgetManifest({
      name: "weather",
      title: "Weather",
      sources: ["azores-external-weather"],
      ttl: "30m",
      defaultSize: { w: 2, h: 2 },
    });
    expect(m.name).toBe("weather");
    expect(m.sources).toEqual(["azores-external-weather"]);
    expect(m.ttl).toBe("30m");
  });

  it("rejects bad input", () => {
    expect(() => parseWidgetManifest(null)).toThrow();
    expect(() =>
      parseWidgetManifest({ title: "x", sources: [], defaultSize: { w: 1, h: 1 } }),
    ).toThrow(/name/);
    expect(() =>
      parseWidgetManifest({
        name: "x",
        title: "x",
        sources: "not-an-array",
        defaultSize: { w: 1, h: 1 },
      }),
    ).toThrow(/sources/);
    expect(() =>
      parseWidgetManifest({
        name: "x",
        title: "x",
        sources: [],
        defaultSize: { w: 1, h: 1 },
        ttl: "ten minutes",
      }),
    ).toThrow();
  });
});

describe("parseSourceManifest", () => {
  it("requires name", () => {
    expect(() => parseSourceManifest({})).toThrow(/name/);
    expect(parseSourceManifest({ name: "x", ttl: "1h" }).ttl).toBe("1h");
  });
});
