import type { MovieComment } from "../entities/MovieComment";
import type { Result } from "../shared/result";

export interface GetCommentParams {
    movieId: number;
}

export interface AddCommentParams {
    movieId: number;
    userName: string;
    message: string;
    rating: number;
}

export interface MovieCommentRepository {
    getComments(params: GetCommentParams): Promise<Result<MovieComment[], Error>>;
    addComment(params: AddCommentParams): Promise<Result<MovieComment, Error>>;
}