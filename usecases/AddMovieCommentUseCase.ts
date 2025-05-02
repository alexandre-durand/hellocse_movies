import type { MovieComment } from "~/domain/entities/MovieComment";
import type { MovieCommentRepository } from "~/domain/repositories/MovieCommentRepository";
import { MovieCommentMessageValidator, MovieCommentRatingValidator, MovieCommentUserNameValidator } from "~/domain/validators/MovieCommentValidators";

export interface GetMovieCommentsUseCasePresenter {
    success(comments: MovieComment): void;
    invalidUserName(message: string): void;
    invalidMessage(message: string): void;
    invalidRating(message: string): void;
    error(message: string): void;
}

export interface AddMovieCommentParams {
    movieId: number;
    userName: string
    message: string;
    rating: number;
}

export class AddMovieCommentUseCase {
    private readonly userNameValidator = new MovieCommentUserNameValidator();
    private readonly messageValidator = new MovieCommentMessageValidator();
    private readonly ratingValidator = new MovieCommentRatingValidator();

    constructor(private readonly presenter: GetMovieCommentsUseCasePresenter, private readonly repository: MovieCommentRepository) { }

    async execute(params: AddMovieCommentParams): Promise<void> {
        if (!this.userNameValidator.isValid(params.userName)) {
            this.presenter.invalidUserName(this.userNameValidator.getValidationError(params.userName));
            return;
        }
        if (!this.messageValidator.isValid(params.message)) {
            this.presenter.invalidMessage(this.messageValidator.getValidationError(params.message));
            return;
        }
        if (!this.ratingValidator.isValid(params.rating)) {
            this.presenter.invalidRating(this.ratingValidator.getValidationError(params.rating));
            return;
        }
        console.log(params)
        const result = await this.repository.addComment(params);

        if (result.ok) {
            this.presenter.success(result.data);
            return;
        }
        this.presenter.error(`Add movie comments failed: ${result.error.message}`);
    }
}
