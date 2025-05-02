import { TMDBClient } from "@/libs/tmdb";

let instance: TMDBClient | null = null;

export function initTMDBClient(apiKey: string): TMDBClient {
  if (instance) {
    throw new Error("TMDBClient already initialized.");
  }
  instance = new TMDBClient(apiKey);
  return instance;
}

export function getTMDBClient(): TMDBClient {
  if (!instance) {
    throw new Error("TMDBClient not initialized. Call initTMDBClient() first.");
  }
  return instance;
}
