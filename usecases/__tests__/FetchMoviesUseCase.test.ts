import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FetchMoviesUseCase } from '../FetchMoviesUseCase';
import type { FetchMoviesPresenter } from '../FetchMoviesUseCase';
import type { FetchMoviesRepository } from '../../domain/repositories/FetchMoviesRepository';
import type { Movie } from '../../domain/entities/Movie';
import type { PageResult } from '~/domain/entities/PageResult';

describe('FetchMoviesUseCase', () => {
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

  it('should call presenter.success when repository returns ok result', async () => {
    const pageResult: PageResult<Movie> = {
      page: 1,
      totalResults: 2,
      totalPages: 1,
      results: [{ title: 'Movie 1' }, { title: 'Movie 2' }],
    };

    (movieRepository.fetchMovies as any).mockResolvedValue({ ok: true, data: pageResult });

    await useCase.execute(1);

    expect(presenter.success).toHaveBeenCalledWith(pageResult);
    expect(presenter.error).not.toHaveBeenCalled();
  });

  it('should call presenter.error when repository returns not ok result', async () => {
    (movieRepository.fetchMovies as any).mockResolvedValue({ ok: false, error: 'something failed' });

    await useCase.execute(1);

    expect(presenter.error).toHaveBeenCalledWith('Fetch movies failed');
    expect(presenter.success).not.toHaveBeenCalled();
  });
});