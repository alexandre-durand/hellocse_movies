import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TMDBSearchMoviesRepository } from '../TMDBSearchMoviesRepository';
import type { TMDBClient } from '~/libs/tmdb';
import type { SearchMoviesRepositoryParams } from '~/domain/repositories/SearchMoviesRepository';
import type { Movie } from '~/domain/entities/Movie';
import type { PageResult } from '~/domain/entities/PageResult';

describe('TMDBSearchMoviesRepository', () => {
  let mockClient: TMDBClient;
  let mockSearchMovies: any;
  let repo: TMDBSearchMoviesRepository;

  beforeEach(() => {
    mockSearchMovies = vi.fn();
    mockClient = {
      search: () => ({
        searchMovies: mockSearchMovies,
      }),
    } as unknown as TMDBClient;

    repo = new TMDBSearchMoviesRepository(mockClient);
  });

  it('should return SuccessResult with mapped movies on success', async () => {
    const apiResponse = {
      page: 1,
      total_results: 2,
      total_pages: 1,
      results: [
        {
          title: 'Movie 1',
          id: 101,
          poster_path: '/img1.jpg',
          overview: 'Desc 1',
          vote_count: 10,
          vote_average: 7.5,
        },
        {
          title: 'Movie 2',
          id: 102,
          poster_path: '/img2.jpg',
          overview: 'Desc 2',
          vote_count: 20,
          vote_average: 8.1,
        },
      ],
    };

    mockSearchMovies.mockResolvedValue(apiResponse);

    const params: SearchMoviesRepositoryParams = { query: 'Movie', page: 1 };
    const result = await repo.searchMovies(params);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual<PageResult<Movie>>({
        page: 1,
        totalResults: 2,
        totalPages: 1,
        results: [
          {
            title: 'Movie 1',
            id: 101,
            imageURL: '/img1.jpg',
            overview: 'Desc 1',
            voteCount: 10,
            voteRating: 7.5,
          },
          {
            title: 'Movie 2',
            id: 102,
            imageURL: '/img2.jpg',
            overview: 'Desc 2',
            voteCount: 20,
            voteRating: 8.1,
          },
        ],
      });
    }
  });

  it('should return FailureResult if an error occurs', async () => {
    const error = new Error('API failure');
    mockSearchMovies.mockRejectedValue(error);

    const result = await repo.searchMovies({ query: 'Batman', page: 1 });

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error('Expected result to be a failure');
    }
    expect(result.error).toEqual(error);
  });
});