import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import { FailureResult, SuccessResult, type Result } from "@/domain/shared/result";
import type { FetchMoviesRepository } from "~/domain/repositories/FetchMoviesRepository";

export interface MockFetchMoviesRepositoryOptions {
  totalPages?: number;
  itemsPerPage?: number;
}

export class MockFetchMoviesRepository implements FetchMoviesRepository {
  private totalPages: number;
  private itemsPerPage: number;

  constructor(options: MockFetchMoviesRepositoryOptions) {
    this.totalPages = options.totalPages ?? 5;
    this.itemsPerPage = options.itemsPerPage ?? 10;
  }

  async fetchMovies({ page }: { page: number }): Promise<Result<PageResult<Movie>, Error>> {
    if (page > this.totalPages) {
      return new FailureResult(new Error("No more pages"));
    }

    return new SuccessResult({
      page,
      totalPages: this.totalPages,
      results: this.createMockMovies(page),
    });
  }

  private createMockMovies(page: number): Movie[] {
    const movies: Movie[] = [];
    for (let i = 0; i < this.itemsPerPage; i++) {
      const id = (page - 1) * this.itemsPerPage + i;
      movies.push({
        id,
        title: `Movie ${id}`,
        overview: `Overview of Movie $id}`,

        imageURL: `https://picsum.photos/id/${id}/200/300.jpg`,
        voteCount: Math.floor(Math.random() * 1000),
        voteRating: Math.random() * 10,
      });
    }
    return movies;
  }
}   