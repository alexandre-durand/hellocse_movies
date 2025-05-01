import { TMDBClient } from "~/libs/tmdb";

const instance: TMDBClient | null = null;

export function initTMDBClient(apiKey: string): TMDBClient {
  if (instance) {
    throw new Error("TMDBClient already initialized.");
  }
  return new TMDBClient(apiKey);
}

export function getTMDBClient(): TMDBClient {
  if (!instance) {
    throw new Error("TMDBClient not initialized. Call initTMDBClient() first.");
  }
  return instance;
}
