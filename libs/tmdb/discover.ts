import type { PageResult } from "./type";

export interface DiscoverMovie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

export class DiscoverClient {
    constructor(private apiKey: string) {}

    async discoverMovies(page: number): Promise<PageResult<DiscoverMovie>> {
        const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }
        return await response.json() as PageResult<DiscoverMovie>;
    }
}