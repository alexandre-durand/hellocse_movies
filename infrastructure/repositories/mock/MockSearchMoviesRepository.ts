import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import type { Result } from "@/domain/shared/result";
import type { SearchMoviesRepository, SearchMoviesRepositoryParams } from "~/domain/repositories/SearchMoviesRepository";
import { MockMoviesRepository } from "./MockMoviesRepository";

export class MockSearchMoviesRepository extends MockMoviesRepository implements SearchMoviesRepository {

  async searchMovies({ page }: SearchMoviesRepositoryParams): Promise<Result<PageResult<Movie>, Error>> {
    return this.fetchMoviesByPage(page);
  }
}   