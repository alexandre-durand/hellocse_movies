import type { GetMovieDetailsRepository } from "@/domain/repositories/GetMovieDetailsRepository";
import { FailureResult, SuccessResult, type Result } from "@/domain/shared/result";
import type { TMDBClient } from "@/libs/tmdb";
import type { MovieDetails } from "@/domain/entities/MovieDetails";
import { buildTMBDImageURL, parseTMBDDate } from "./utils";

export class TMDBGetMovieDetailsRepository implements GetMovieDetailsRepository {
    constructor(private readonly client: TMDBClient) { }

    async getDetails(movieId: number): Promise<Result<MovieDetails, Error>> {
        try {
            const response = await this.client.movieDetails().getDetails(movieId, ['credits']);

            return new SuccessResult({
                id: response.id,
                title: response.title,
                overview: response.overview,
                genres: response.genres.map((genre) => genre.name),
                backdropURL: buildTMBDImageURL(response.backdrop_path),
                posterURL: buildTMBDImageURL(response.poster_path),
                directors: response.credits!.crew.map((member) => ({
                    id: member.id,
                    name: member.name,
                    profileURL: buildTMBDImageURL(member.profile_path),
                    job: member.job,
                })).filter(member => member.job.toLowerCase() === 'director'),
                cast: response.credits!.cast.map((actor) => ({
                    id: actor.id,
                    name: actor.name,
                    character: actor.character,
                    profileURL: buildTMBDImageURL(actor.profile_path),
                })),
                runtime: response.runtime,
                releaseDate: parseTMBDDate(response.release_date),
                voteCount: response.vote_count,
                voteRating: response.vote_average,
            });
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }
}