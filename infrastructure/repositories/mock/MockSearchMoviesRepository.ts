import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import type { Result } from "@/domain/shared/result";
import type { SearchMoviesRepository, SearchMoviesRepositoryParams } from "~/domain/repositories/SearchMoviesRepository";
import { MockMoviesRepository, type MockMoviesRepositoryOptions } from "./MockMoviesRepository";

export class MockSearchMoviesRepository extends MockMoviesRepository implements SearchMoviesRepository {
  constructor(options: MockMoviesRepositoryOptions) {
    super(options);
  }

  async searchMovies({ page }: SearchMoviesRepositoryParams): Promise<Result<PageResult<Movie>, Error>> {
    return this.fetchMoviesByPage(page);
  }
}   