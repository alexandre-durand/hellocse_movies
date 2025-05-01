import type { Movie, PageResult } from "./type";

export interface DiscoverMoviesParams {
  page: number;
}

export class DiscoverClient {
  constructor(private apiKey: string) { }

  async discoverMovies(
    params: DiscoverMoviesParams,
  ): Promise<PageResult<Movie>> {
    const searchParams = new URLSearchParams();
    searchParams.append("page", params.page)

    const url = `https://api.themoviedb.org/3/discover/movie?${searchParams}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to discover movies: ${response.statusText}`);
    }
    return (await response.json()) as PageResult<Movie>;
  }
}
