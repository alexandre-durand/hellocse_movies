export interface PageResult<T> {
  page: number;
  totalPages: number;
  results: T[];
}
