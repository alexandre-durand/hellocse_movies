import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import { FailureResult, SuccessResult, type Result } from "@/domain/shared/result";

export interface MockMoviesRepositoryOptions {
  totalPages?: number;
  itemsPerPage?: number;
}

export class MockMoviesRepository {
  private totalPages: number;
  private itemsPerPage: number;

  constructor(options: MockMoviesRepositoryOptions) {
    this.totalPages = options.totalPages ?? 5;
    this.itemsPerPage = options.itemsPerPage ?? 10;
  }

  protected async fetchMoviesByPage(page: number): Promise<Result<PageResult<Movie>, Error>> {
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

        posterURL: `https://picsum.photos/id/${id}/200/300.jpg`,
        voteCount: Math.floor(Math.random() * 1000),
        voteRating: Math.random() * 10,
      });
    }
    return movies;
  }
}   