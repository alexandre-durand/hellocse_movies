import type { Movie } from "../entities/Movie";
import type { PageResult } from "../entities/PageResult";
import type { Result } from "../shared/result";

export interface SearchMoviesRepositoryParams {
    query: string;
    page: number;
}

export interface SearchMoviesRepository {
    searchMovies(params: SearchMoviesRepositoryParams): Promise<Result<PageResult<Movie>, Error>>;
}