<template>
  <v-infinite-scroll class="w-full" color="primary" @load="onLoad">
    search
    <MovieList :movies="movies" />
  </v-infinite-scroll>
</template>

<script setup lang="ts">
import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import { getTMDBClient } from "@/services/TMDBSingleton";
import { SearchMoviesUseCase } from "@/usecases/SearchMoviesUseCase";
import { TMDBSearchMoviesRepository } from "@/infrastructure/repositories/api/TMDBSearchMoviesRepository";

const props = defineProps<{
  search: string;
}>();

const fetchMoviesRepository = new TMDBSearchMoviesRepository(getTMDBClient());

const {
  items: movies,
  hasMorePages,
  reset,
  handlePageResult,
  fetchNextPage,
} = useInfiniteItems<Movie>();

const usecase = new SearchMoviesUseCase(
  {
    success(data: PageResult<Movie>) {
      handlePageResult(data);
    },
    error(msg: string) {
      console.log(msg);
    },
    invalidQuery() {
      console.log("Invalid query");
    },
  },
  fetchMoviesRepository
);

async function fetchNextMovies() {
  await fetchNextPage((page: number) => usecase.execute(props.search, page));
}

async function onLoad({ done }) {
  await fetchNextMovies();
  if (hasMorePages.value) {
    done("ok");
  } else {
    done("empty");
  }
}

watchThrottled(
  () => props.search,
  async () => {
    reset();
    await fetchNextMovies();
  },
  {
    throttle: 500,
  }
);
</script>
