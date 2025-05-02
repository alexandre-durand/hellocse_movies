import type { MovieComment } from "@/domain/entities/MovieComment";
import type { MovieCommentRepository } from "@/domain/repositories/MovieCommentRepository";

export interface GetMovieCommentsUseCasePresenter {
    success(comments: MovieComment[]): void;
    error(message: string): void;
}

export class GetMovieCommentsUseCase {
    constructor(private readonly presenter: GetMovieCommentsUseCasePresenter, private readonly repository: MovieCommentRepository) { }

    async execute(movieId: number): Promise<void> {
        const result = await this.repository.getComments({ movieId });
        if (result.ok) {
            this.presenter.success(result.data);
            return;
        }
        this.presenter.error(`Get movie comments failed: ${result.error.message}`);
    }
}