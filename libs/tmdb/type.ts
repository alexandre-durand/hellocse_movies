export type PageResult<T> = {
    page: number;
    total_pages: number;
    total_results: number;
    results: T[];
}

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}