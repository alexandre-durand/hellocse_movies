import type { Movie, PageResult } from "./type";

export interface SearchMoviesParams {
    query: string;
    page: number;
}

export class SearchClient {
    constructor(private apiKey: string) {}

    async searchMovies(params: SearchMoviesParams): Promise<PageResult<Movie>> {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(params.query)}&page=${params.page}&api_key=${this.apiKey}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error searching movies: ${response.statusText}`);
        }
        return await response.json();
    }
}