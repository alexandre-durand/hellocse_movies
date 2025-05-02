<template>
  <v-infinite-scroll class="w-full" color="primary" @load="onLoad">
    <MovieList :movies="movies" />
  </v-infinite-scroll>
</template>

<script setup lang="ts">
import type { Movie } from "@/domain/entities/Movie";
import type { PageResult } from "@/domain/entities/PageResult";
import { FetchMoviesUseCase } from "@/usecases/FetchMoviesUseCase";
import { TMDBFetchMoviesRepository } from "@/infrastructure/repositories/api/TMDBFetchMoviesRepository";
import { getTMDBClient } from "@/services/TMDBSingleton";

const fetchMoviesRepository = new TMDBFetchMoviesRepository(getTMDBClient());

const {
  items: movies,
  hasMorePages,
  handlePageResult,
  fetchNextPage,
} = useInfiniteItems<Movie>();

const usecase = new FetchMoviesUseCase(
  {
    success(data: PageResult<Movie>) {
      handlePageResult(data);
    },
    error(msg: string) {
      console.error(msg);
    },
  },
  fetchMoviesRepository
);

async function fetchNextMovies() {
  await fetchNextPage((page: number) => usecase.execute(page));
}

async function onLoad({ done }) {
  await fetchNextMovies();
  if (hasMorePages.value) {
    done("ok");
  } else {
    done("empty");
  }
}
</script>
