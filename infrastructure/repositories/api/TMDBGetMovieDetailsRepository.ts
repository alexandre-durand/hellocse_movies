import type { GetMovieDetailsRepository } from "~/domain/repositories/GetMovieDetailsRepository";
import { FailureResult, SuccessResult, type Result } from "~/domain/shared/result";
import type { TMDBClient } from "~/libs/tmdb";
import type { MovieDetails } from "~/domain/entities/MovieDetails";

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
                backdropURL: `https://image.tmdb.org/t/p/original${response.backdrop_path}`,
                posterURL: `https://image.tmdb.org/t/p/original${response.poster_path}`,
                directors: response.credits!.crew.map((member: any) => ({
                    id: member.id,
                    name: member.name,
                    profileURL: `https://image.tmdb.org/t/p/original${member.profile_path}`,
                    job: member.job,
                })).filter(member => member.job.toLowerCase() === 'director'),
                cast: response.credits!.cast.map((actor: any) => ({
                    id: actor.id,
                    name: actor.name,
                    character: actor.character,
                    profileURL: `https://image.tmdb.org/t/p/original${actor.profile_path}`,
                })),
                runtime: response.runtime,
                releaseDate: new Date(response.release_date),
                voteCount: response.vote_count,
                voteRating: response.vote_average,
            });
        } catch (error) {
            return new FailureResult(error as Error);
        }
    }
}