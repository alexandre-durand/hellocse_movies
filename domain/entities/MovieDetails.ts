export interface CrewMember {
    id: number;
    name: string;
    job: string;
    profileURL: string;
}

export interface Actor {
    id: number;
    name: string;
    character: string;
    profileURL: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    genres: string[];
    backdropURL: string;
    posterURL: string;
    directors: CrewMember[];
    cast: Actor[];
    crew: CrewMember[];
    runtime: number;
    releaseDate: Date;
    voteCount: number;
    voteRating: number;
}
