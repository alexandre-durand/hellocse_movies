import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SearchMoviesPresenter } from '../SearchMoviesUseCase';
import { SearchMoviesUseCase } from '../SearchMoviesUseCase';
import type { SearchMoviesRepository } from '~/domain/repositories/SearchMoviesRepository';
import type { PageResult } from '~/domain/entities/PageResult';
import type { Movie } from '~/domain/entities/Movie';

describe('SearchMoviesUseCase', () => {
  let presenter: SearchMoviesPresenter;
  let repository: SearchMoviesRepository;
  let useCase: SearchMoviesUseCase;

  beforeEach(() => {
    presenter = {
      success: vi.fn(),
      error: vi.fn(),
      invalidQuery: vi.fn(),
    };

    repository = {
      searchMovies: vi.fn(),
    };

    useCase = new SearchMoviesUseCase(presenter, repository);
  });

  it('should call presenter.invalidQuery if query is empty', async () => {
    await useCase.execute('', 1);
    expect(presenter.invalidQuery).toHaveBeenCalled();
    expect(presenter.success).not.toHaveBeenCalled();
    expect(presenter.error).not.toHaveBeenCalled();
  });

  it('should call presenter.success when repository returns ok result', async () => {
    const pageResult: PageResult<Movie> = {
      page: 1,
      totalPages: 1,
      totalResults: 1,
      results: [{
            id: 1,
            title: 'Test Movie',
            imageURL: '/path/to/image.jpg',
            overview: 'Overview',
            voteCount: 100,
            voteRating: 8.5
       }],
    };

    (repository.searchMovies as any).mockResolvedValue({
      ok: true,
      data: pageResult,
    });

    await useCase.execute('Test', 1);

    expect(presenter.success).toHaveBeenCalledWith(pageResult);
    expect(presenter.invalidQuery).not.toHaveBeenCalled();
    expect(presenter.error).not.toHaveBeenCalled();
  });

  it('should call presenter.error when repository returns a failure', async () => {
    (repository.searchMovies as any).mockResolvedValue({
      ok: false,
      error: new Error('Something went wrong'),
    });

    await useCase.execute('Batman', 1);

    expect(presenter.error).toHaveBeenCalledWith('Fetch movies failed');
    expect(presenter.success).not.toHaveBeenCalled();
    expect(presenter.invalidQuery).not.toHaveBeenCalled();
  });
});