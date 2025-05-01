import type { MovieDetails } from "./type";

export class MovieDetailsClient {
    constructor(private apiKey: string) { }

    async getDetails(movieId: number, appendToResponse: string[] = []): Promise<MovieDetails> {
        const params = new URLSearchParams();
        for (const param of appendToResponse) {
            params.append("append_to_response", param);
        }

        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?${params}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                },
            }
        )
        if (!response.ok) {
            throw new Error("Failed to fetch movie detail: " + response.statusText);
        }
        return await response.json();
    }
}