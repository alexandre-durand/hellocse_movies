import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import { FailureResult, SuccessResult, type Result } from "@/domain/shared/result";
import type { FetchMoviesRepository } from "~/domain/repositories/FetchMoviesRepository";

export class MockFetchMoviesRepository implements FetchMoviesRepository {
  private movies: Movie[] = [];
  private totalPages: number = 0;

  constructor(totalPages: number) {
    this.totalPages = totalPages;
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
    for (let i = 0; i < 20; i++) {
        const id = (page- 1) * 20 + i;
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