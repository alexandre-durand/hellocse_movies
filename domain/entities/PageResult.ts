export interface PageResult<T> {
  page: number;
  totalResults: number;
  totalPages: number;
  results: T[];
}
