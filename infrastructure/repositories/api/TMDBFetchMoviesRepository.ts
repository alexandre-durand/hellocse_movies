import type { Movie } from "~/domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";
import type { FetchMoviesRepository } from "~/domain/repositories/FetchMoviesRepository";
import type { Result } from "~/domain/shared/result";
import type { TMDBClient } from "~/libs/tmdb/client";
import { FailureResult, SuccessResult } from "../../../domain/shared/result";

export class TMDBFecthMoviesRepository implements FetchMoviesRepository {
    constructor(private client: TMDBClient) {}

    async fetchMovies(page: number): Promise<Result<PageResult<Movie>, Error>> {
        try {
            const response = await this.client.discover().discoverMovies(page);
            return new SuccessResult({
                page: response.page,
                totalResults: response.total_results,
                totalPages: response.total_pages,
                results: response.results.map((movie) => ({
                    title: movie.title,
                })),
            })
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }
}   