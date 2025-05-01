export type PageResult<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  runtime: number;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export type MovieGenre = {
  id: number;
  name: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type MovieCredits = {
  cast: Actor[];
  crew: CrewMember[];
}

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
export interface MovieDetails extends Movie {
  genres: MovieGenre[];
  production_companies: ProductionCompany[];

  credits?: MovieCredits;
}