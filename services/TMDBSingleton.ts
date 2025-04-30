import { TMDBClient } from "~/libs/tmdb";

export class TMDBSingleton {
  private static instance: TMDBClient;

  private constructor() {}

  public static getInstance(apiKey?: string): TMDBClient {
    if (!TMDBSingleton.instance) {
      if (!apiKey) {
        throw new Error("TMDBClient not initialized. Call init() first.");
      }
      TMDBSingleton.instance = new TMDBClient(apiKey);
    }
   
    return TMDBSingleton.instance;
  }
}   