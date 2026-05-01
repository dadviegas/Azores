import { registerSource, type Source } from "@azores/core";

export type WeatherParams = { lat: number; lng: number };
export type WeatherData = {
  current_weather?: { temperature: number; weathercode: number; windspeed: number };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
};

export const WEATHER_SOURCE_NAME = "azores-external-weather";

export const weatherSource: Source<WeatherParams, WeatherData> = {
  name: WEATHER_SOURCE_NAME,
  ttlMs: 10 * 60 * 1000,
  build: ({ lat, lng }) =>
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current_weather=true` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&timezone=auto`,
};

registerSource(weatherSource);
