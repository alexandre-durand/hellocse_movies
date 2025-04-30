import type { Movie, PageResult } from "./type";

export interface DiscoverMoviesParams {
    page: number;
}

export class DiscoverClient {
    constructor(private apiKey: string) {}

    async discoverMovies(params: DiscoverMoviesParams): Promise<PageResult<Movie>> {
        const url = `https://api.themoviedb.org/3/discover/movie?page=${params.page}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }
        return await response.json() as PageResult<Movie>;
    }
}