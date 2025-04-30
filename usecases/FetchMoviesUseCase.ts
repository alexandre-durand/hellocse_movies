import type { Movie } from "~/domain/entities/Movie";
import type { PageResult } from "~/domain/entities/PageResult";
import type { FetchMoviesRepository } from "~/domain/repositories/FetchMoviesRepository";

export interface FetchMoviesPresenter {
    success(movies: PageResult<Movie>): void;
    error(string: string): void;
}

export class FetchMoviesUseCase {
    constructor(private presenter: FetchMoviesPresenter, private movieRepository: FetchMoviesRepository) {}

    async execute(page: number): Promise<void> {
        const result = await this.movieRepository.fetchMovies(page);
        if (result.ok) { 
            this.presenter.success(result.data);
            return;
        }

        this.presenter.error(`Fetch movies failed`);
    }
}