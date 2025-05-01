import type { MovieDetails } from "../entities/MovieDetails";
import type { Result } from "../shared/result";

export interface GetMovieDetailsRepository {
    getDetails(movieId: number): Promise<Result<MovieDetails, Error>>;
}