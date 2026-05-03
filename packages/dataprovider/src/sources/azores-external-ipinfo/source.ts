import { registerSource, type Source } from "@azores/core";

export type IpInfoParams = Record<string, never>;

export type IpInfoData = {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country_code: string;
  org: string;
  timezone: string;
  latitude: number;
  longitude: number;
};

export const IPINFO_SOURCE_NAME = "azores-external-ipinfo";

export const ipInfoSource: Source<IpInfoParams, IpInfoData> = {
  name: IPINFO_SOURCE_NAME,
  ttlMs: 24 * 60 * 60 * 1000,
  build: () => "https://ipapi.co/json/",
};

registerSource(ipInfoSource);
