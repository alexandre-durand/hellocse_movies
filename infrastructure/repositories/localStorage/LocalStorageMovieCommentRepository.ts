import type { MovieComment } from "@/domain/entities/MovieComment";
import type { AddCommentParams, GetCommentParams, MovieCommentRepository } from "@/domain/repositories/MovieCommentRepository";
import { FailureResult, SuccessResult, type Result } from "@/domain/shared/result";

export class LocalStorageMovieCommentRepository implements MovieCommentRepository {
    public constructor() { }

    public async getComments(params: GetCommentParams): Promise<Result<MovieComment[], Error>> {
        try {
            const storageKey = this.buildKey(params.movieId);
            const storedCommentsStr = localStorage.getItem(storageKey);
            if (!storedCommentsStr) {
                return new SuccessResult([]);
            }

            return new SuccessResult(this.storedCommentsToModel(storedCommentsStr));
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }

    public async addComment(params: AddCommentParams): Promise<Result<MovieComment, Error>> {
        try {
            const comments = await this.getComments({ movieId: params.movieId });
            if (!comments.ok) {
                return new FailureResult(comments.error);
            }

            const newComment: MovieComment = {
                id: Date.now(), // Use timestamp as a unique ID
                createdAt: new Date(),
                userName: params.userName,
                message: params.message,
                rating: params.rating,
            };
            const updatedComments = [...comments.data, newComment];
            const storageKey = this.buildKey(params.movieId);
            localStorage.setItem(storageKey, this.modelToStoredComments(updatedComments));

            return new SuccessResult(newComment);
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }

    private buildKey(movieId: number): string {
        return `movie_comments_${movieId}`;
    }

    private storedCommentsToModel(storedCommentsStr: string): MovieComment[] {
        try {
            if (storedCommentsStr === '') {
                return [];
            }
            const storedComments = JSON.parse(storedCommentsStr) as MovieCommentStored[];
            return storedComments.map(storedComment => deserializeComment(storedComment));
        } catch (error) {
            throw new Error("Failed to parse stored comments:" + (error as Error).message);
        }
    }

    private modelToStoredComments(comments: MovieComment[]): string {
        return JSON.stringify(comments.map(serializeComment));
    }
}

interface MovieCommentStored {
    id: number;
    createdAt: string; // Store as ISO string for better compatibility
    userName: string;
    message: string;
    rating: number;
}

function serializeComment(comment: MovieComment): MovieCommentStored {
    return {
        id: comment.id,
        createdAt: comment.createdAt.toISOString(), // Convert Date to ISO string
        userName: comment.userName,
        message: comment.message,
        rating: comment.rating,
    };
}

function deserializeComment(storedComment: MovieCommentStored): MovieComment {
    return {
        id: storedComment.id,
        createdAt: new Date(storedComment.createdAt), // Convert ISO string back to Date
        userName: storedComment.userName,
        message: storedComment.message,
        rating: storedComment.rating,
    };
}