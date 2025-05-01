import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import type { Result } from "@/domain/shared/result";
import type { FetchMoviesRepository } from "~/domain/repositories/FetchMoviesRepository";
import { MockMoviesRepository } from "./MockMoviesRepository";

export class MockFetchMoviesRepository extends MockMoviesRepository implements FetchMoviesRepository {
  async fetchMovies({ page }: { page: number }): Promise<Result<PageResult<Movie>, Error>> {
    return this.fetchMoviesByPage(page);
  }
}   