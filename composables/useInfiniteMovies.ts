import type { Movie } from '@/domain/entities/Movie';
import type { PageResult } from '@/domain/entities/PageResult';
import { FetchMoviesUseCase } from '@/usecases/FetchMoviesUseCase';
import type { FetchMoviesPresenter } from '@/usecases/FetchMoviesUseCase';
import type { FetchMoviesRepository } from '@/domain/repositories/FetchMoviesRepository';

export function useInfiniteMovies(repository: FetchMoviesRepository) {
  const movies = ref<Movie[]>([]);
  const currentPage = ref(1);
  const totalPages = ref<number | null>(null);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const presenter: FetchMoviesPresenter = {
    success(data: PageResult<Movie>) {
      movies.value.push(...data.results);
      currentPage.value = data.page + 1;
      totalPages.value = data.totalPages;
    },
    error(msg: string) {
      errorMessage.value = msg;
    },
  };

  const usecase = new FetchMoviesUseCase(presenter, repository);

  async function fetchNextPage() {
    if (isLoading.value || (totalPages.value && currentPage.value > totalPages.value)) return;

    isLoading.value = true;
    await usecase.execute(currentPage.value);
    isLoading.value = false;
  }

  return {
    movies,
    isLoading,
    errorMessage,
    fetchNextPage,
  };
}