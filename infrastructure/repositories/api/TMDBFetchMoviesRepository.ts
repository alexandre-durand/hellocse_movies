import type { Movie } from "~/domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";
import type { FetchMoviesRepository, FetchMoviesRepositoryParams } from "~/domain/repositories/FetchMoviesRepository";
import type { Result } from "~/domain/shared/result";
import type { TMDBClient } from "~/libs/tmdb/client";
import { FailureResult, SuccessResult } from "../../../domain/shared/result";

export class TMDBFetchMoviesRepository implements FetchMoviesRepository {
    constructor(private client: TMDBClient) {}

    async fetchMovies(params: FetchMoviesRepositoryParams): Promise<Result<PageResult<Movie>, Error>> {
        try {
            const response = await this.client.discover().discoverMovies({
                page: params.page
            });
            return new SuccessResult({
                page: response.page,
                totalResults: response.total_results,
                totalPages: response.total_pages,
                results: response.results.map((movie) => ({
                    title: movie.title,
                    id: movie.id,
                    imageURL: movie.poster_path,
                    overview: movie.overview,
                    voteCount: movie.vote_count,
                    voteRating: movie.vote_average,
                })),
            })
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }
}   