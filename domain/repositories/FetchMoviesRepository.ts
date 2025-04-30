import type { Movie } from "../entities/Movie";
import type { PageResult } from "../entities/PageResult";
import type { Result } from "../shared/result";

export interface FetchMoviesRepositoryParams {
  page: number;
}

export interface FetchMoviesRepository {
  fetchMovies(
    params: FetchMoviesRepositoryParams,
  ): Promise<Result<PageResult<Movie>, Error>>;
}
