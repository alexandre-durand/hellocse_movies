import type { Movie } from "~/domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";
import type { Result } from "~/domain/shared/result";
import type { TMDBClient } from "~/libs/tmdb/client";
import { FailureResult, SuccessResult } from "../../../domain/shared/result";
import type {
  SearchMoviesRepository,
  SearchMoviesRepositoryParams,
} from "~/domain/repositories/SearchMoviesRepository";
import { TMDBRepository } from "./TMDBRepository";

export class TMDBSearchMoviesRepository extends TMDBRepository implements SearchMoviesRepository {
  constructor(private client: TMDBClient) {
    super()
  }

  async searchMovies(
    params: SearchMoviesRepositoryParams,
  ): Promise<Result<PageResult<Movie>, Error>> {
    try {
      const response = await this.client.search().searchMovies({
        query: params.query,
        page: params.page,
      });
      return new SuccessResult({
        page: response.page,
        totalResults: response.total_results,
        totalPages: response.total_pages,
        results: response.results.map((movie) => ({
          title: movie.title,
          id: movie.id,
          posterURL: this.buildImageURL(movie.poster_path),
          overview: movie.overview,
          voteCount: movie.vote_count,
          voteRating: movie.vote_average,
        })),
      });
    } catch (error) {
      return new FailureResult(error as Error);
    }
  }
}
