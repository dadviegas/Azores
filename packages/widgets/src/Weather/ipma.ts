// Helpers for the IPMA augmentation path. IPMA only covers Portugal —
// mainland, Azores, and Madeira — so we gate on those bounding boxes
// before pulling station data.

import type {
  IpmaObservation,
  IpmaObservations,
  IpmaStationFeature,
  IpmaStations,
} from "@azores/dataprovider";

type LatLng = { lat: number; lng: number };

const inBox = (
  { lat, lng }: LatLng,
  box: { latMin: number; latMax: number; lngMin: number; lngMax: number },
): boolean =>
  lat >= box.latMin && lat <= box.latMax && lng >= box.lngMin && lng <= box.lngMax;

export const isPortugal = (p: LatLng): boolean =>
  // Mainland
  inBox(p, { latMin: 36.9, latMax: 42.2, lngMin: -9.6, lngMax: -6.1 }) ||
  // Azores
  inBox(p, { latMin: 36.9, latMax: 39.8, lngMin: -31.4, lngMax: -24.9 }) ||
  // Madeira
  inBox(p, { latMin: 32.4, latMax: 33.2, lngMin: -17.4, lngMax: -16.2 });

// Equirectangular distance — good enough for picking the nearest station
// out of a few hundred candidates.
const distanceKm = (a: LatLng, b: LatLng): number => {
  const toRad = (n: number): number => (n * Math.PI) / 180;
  const x = toRad(b.lng - a.lng) * Math.cos(toRad((a.lat + b.lat) / 2));
  const y = toRad(b.lat - a.lat);
  return Math.sqrt(x * x + y * y) * 6371;
};

export const nearestStation = (
  point: LatLng,
  stations: IpmaStations,
): IpmaStationFeature | undefined => {
  // IPMA occasionally returns a bare array; the source's `parse` normalises
  // most cases but stay defensive — a malformed response should render
  // "no station data" rather than crash the widget.
  const features = Array.isArray(stations?.features)
    ? stations.features
    : Array.isArray(stations as unknown)
      ? (stations as unknown as IpmaStationFeature[])
      : [];
  let best: IpmaStationFeature | undefined;
  let bestDist = Infinity;
  for (const f of features) {
    const coords = f?.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) continue;
    const [lng, lat] = coords;
    const d = distanceKm(point, { lat, lng });
    if (d < bestDist) {
      bestDist = d;
      best = f;
    }
  }
  return best;
};

// IPMA returns -99 for missing readings. Strip those so the UI shows "—".
const clean = (n: number | undefined): number | undefined =>
  n == null || n <= -90 ? undefined : n;

export type LatestStationReading = {
  stationId: number;
  stationName: string;
  observedAt: string; // ISO datetime (UTC)
  temperature?: number;
  windKmh?: number;
  humidity?: number;
};

// Walk the time-keyed map newest-first and return the first slot that has
// a reading for `stationId`.
export const latestForStation = (
  station: IpmaStationFeature,
  obs: IpmaObservations,
): LatestStationReading | undefined => {
  if (!obs || typeof obs !== "object") return undefined;
  const id = String(station.properties.idEstacao);
  const times = Object.keys(obs).sort().reverse();
  for (const t of times) {
    const slot = obs[t];
    const reading = slot?.[id];
    if (reading && isFiniteObs(reading)) {
      return {
        stationId: station.properties.idEstacao,
        stationName: station.properties.localEstacao,
        observedAt: t,
        temperature: clean(reading.temperatura),
        windKmh: clean(reading.intensidadeVentoKM),
        humidity: clean(reading.humidade),
      };
    }
  }
  return undefined;
};

const isFiniteObs = (r: IpmaObservation): boolean =>
  // Treat the slot as usable if at least temperature is present.
  Number.isFinite(r.temperatura) && r.temperatura > -90;
