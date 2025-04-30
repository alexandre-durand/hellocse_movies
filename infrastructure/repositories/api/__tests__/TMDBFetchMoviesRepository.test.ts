import { describe, expect, it, vi } from 'vitest'

import { TMDBFetchMoviesRepository } from '../TMDBFetchMoviesRepository';
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
        { 
          id: 1,
          title: 'Movie 1',
          poster_path: '/path/to/poster1.jpg',
          overview: 'Overview of Movie 1',
          vote_count: 100,
          vote_average: 8.5,
         },
        { 
          id: 2,
          title: 'Movie 2',
          poster_path: '/path/to/poster2.jpg',
          overview: 'Overview of Movie 2',
          vote_count: 200,
          vote_average: 7.5,
         },
      ],
    };

    mockDiscoverMovies.mockResolvedValue(mockApiResponse);

    const repo = new TMDBFetchMoviesRepository(mockClient);
    const result = await repo.fetchMovies({
      page: 1,
    });

    expect(mockClient.discover).toHaveBeenCalled();
    expect(mockDiscoverMovies).toHaveBeenCalledWith({ page: 1 });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual({
        page: 1,
        totalResults: 100,
        totalPages: 10,
        results: [
          { 
            id: 1,
            title: 'Movie 1',
            imageURL: '/path/to/poster1.jpg',
            overview: 'Overview of Movie 1',
            voteCount: 100,
            voteRating: 8.5,
           },
          { 
            id: 2,
            title: 'Movie 2',
            imageURL: '/path/to/poster2.jpg',
            overview: 'Overview of Movie 2',
            voteCount: 200,
            voteRating: 7.5,
           },
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

    const repo = new TMDBFetchMoviesRepository(mockClient);
    const result = await repo.fetchMovies({
      page: 1
  });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.results).toEqual([]);
      expect(result.data.totalResults).toBe(0);
      expect(result.data.totalPages).toBe(0);
    }
  });
});