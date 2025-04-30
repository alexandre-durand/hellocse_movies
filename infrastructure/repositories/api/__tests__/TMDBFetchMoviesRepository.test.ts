import { describe, expect, it, vi } from 'vitest'

import { TMDBFecthMoviesRepository } from '../TMDBFetchMoviesRepository';
import { TMDBClient } from '../../../../libs/tmdb'; 

describe('TMDBFetchMoviesRepository', () => {
  const mockDiscoverMovies = vi.fn();
  const mockDiscover = vi.fn(() => ({
    discoverMovies: mockDiscoverMovies,
  }));

  const mockClient: TMDBClient = {
    discover: mockDiscover,
  } as unknown as TMDBClient;

  it('should fetch movies and map them to domain model', async () => {
    const mockApiResponse = {
      page: 1,
      total_results: 100,
      total_pages: 10,
      results: [
        { title: 'Movie 1' },
        { title: 'Movie 2' },
      ],
    };

    mockDiscoverMovies.mockResolvedValue(mockApiResponse);

    const repo = new TMDBFecthMoviesRepository(mockClient);
    const result = await repo.fetchMovies(1);

    expect(mockClient.discover).toHaveBeenCalled();
    expect(mockDiscoverMovies).toHaveBeenCalledWith(1);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({
        page: 1,
        totalResults: 100,
        totalPages: 10,
        results: [
          { title: 'Movie 1' },
          { title: 'Movie 2' },
        ],
      });
    }
    
  });

  it('should return an empty result list if API returns no results', async () => {
    mockDiscoverMovies.mockResolvedValue({
      page: 1,
      total_results: 0,
      total_pages: 0,
      results: [],
    });

    const repo = new TMDBFecthMoviesRepository(mockClient);
    const result = await repo.fetchMovies(1);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.results).toEqual([]);
      expect(result.data.totalResults).toBe(0);
      expect(result.data.totalPages).toBe(0);
    }
  });
});