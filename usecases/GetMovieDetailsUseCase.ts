import type { MovieDetails } from "~/domain/entities/MovieDetails";
import type { GetMovieDetailsRepository } from "~/domain/repositories/GetMovieDetailsRepository";

export interface GetMovieDetailsPresenter {
    success(movieDetails: MovieDetails): void;
    error(string: string): void;
}

export class GetMovieDetailsUseCase {
    constructor(private readonly presenter: GetMovieDetailsPresenter, private readonly repository: GetMovieDetailsRepository) { }

    async execute(id: number): Promise<void> {
        const result = await this.repository.getDetails(id);
        if (result.ok) {
            this.presenter.success(result.data);
            return;
        }
        this.presenter.error(`Get movie details failed: ` + result.error.message);
    }
}