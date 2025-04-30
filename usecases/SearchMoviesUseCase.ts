import type { Movie } from "~/domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";
import type { SearchMoviesRepository } from "~/domain/repositories/SearchMoviesRepository";

export interface SearchMoviesPresenter {
    success(movies: PageResult<Movie>): void;
    invalidQuery(): void
    error(string: string): void;
}

export class SearchMoviesUseCase {
    constructor(private presenter: SearchMoviesPresenter, private movieRepository: SearchMoviesRepository) {}

    async execute(query: string, page: number): Promise<void> {
        if (!query || query.trim().length === 0) {
            this.presenter.invalidQuery();
            return;
        }

        const result = await this.movieRepository.searchMovies({ 
            query,
            page
        });
        if (result.ok) { 
            this.presenter.success(result.data);
            return;
        }

        this.presenter.error(`Fetch movies failed`);
    }
}