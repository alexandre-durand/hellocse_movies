import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import type { Result } from "@/domain/shared/result";
import type { TMDBClient } from "@/libs/tmdb/client";
import { FailureResult, SuccessResult } from "../../../domain/shared/result";
import type {
  SearchMoviesRepository,
  SearchMoviesRepositoryParams,
} from "@/domain/repositories/SearchMoviesRepository";
import { buildTMBDImageURL } from "./utils";

export class TMDBSearchMoviesRepository implements SearchMoviesRepository {
  constructor(private client: TMDBClient) { }

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
        totalPages: response.total_pages,
        results: response.results.map((movie) => ({
          title: movie.title,
          id: movie.id,
          posterURL: buildTMBDImageURL(movie.poster_path),
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
