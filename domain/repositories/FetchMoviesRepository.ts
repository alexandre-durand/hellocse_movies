import type { Movie } from "../entities/Movie";
import type { PageResult } from "../entities/PageResult";
import type { Result } from "../shared/result";

export interface FetchMoviesRepository {
    fetchMovies(page: number): Promise<Result<PageResult<Movie>, Error>>;
}