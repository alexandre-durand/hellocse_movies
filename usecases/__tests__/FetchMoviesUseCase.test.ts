import { describe, it, expect, vi, beforeEach } from "vitest";
import { FetchMoviesUseCase } from "../FetchMoviesUseCase";
import type { FetchMoviesPresenter } from "../FetchMoviesUseCase";
import type { FetchMoviesRepository } from "../../domain/repositories/FetchMoviesRepository";
import type { Movie } from "../../domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";

describe("FetchMoviesUseCase", () => {
  let presenter: FetchMoviesPresenter;
  let movieRepository: FetchMoviesRepository;
  let useCase: FetchMoviesUseCase;

  beforeEach(() => {
    presenter = {
      success: vi.fn(),
      error: vi.fn(),
    };

    movieRepository = {
      fetchMovies: vi.fn(),
    };

    useCase = new FetchMoviesUseCase(presenter, movieRepository);
  });

  it("should call presenter.success when repository returns ok result", async () => {
    const pageResult: PageResult<Movie> = {
      page: 1,
      totalResults: 2,
      totalPages: 1,
      results: [
        {
          id: 1,
          title: "Movie 1",
          posterURL: "/path/to/poster1.jpg",
          overview: "Overview of Movie 1",
          voteCount: 100,
          voteRating: 8.5,
        },
        {
          id: 2,
          title: "Movie 2",
          posterURL: "/path/to/poster2.jpg",
          overview: "Overview of Movie 2",
          voteCount: 200,
          voteRating: 7.5,
        },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (movieRepository.fetchMovies as any).mockResolvedValue({
      ok: true,
      data: pageResult,
    });

    await useCase.execute(1);

    expect(presenter.success).toHaveBeenCalledWith(pageResult);
    expect(presenter.error).not.toHaveBeenCalled();
  });

  it("should call presenter.error when repository returns not ok result", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (movieRepository.fetchMovies as any).mockResolvedValue({
      ok: false,
      error: "something failed",
    });

    await useCase.execute(1);

    expect(presenter.error).toHaveBeenCalledWith("Fetch movies failed");
    expect(presenter.success).not.toHaveBeenCalled();
  });
});
