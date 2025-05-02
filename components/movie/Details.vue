<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    loading...
  </div>
  <div v-if="movieDetails">
    <MovieDetailsBackdrop :movie="movieDetails" />
    <v-container>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-1">
          <v-img
            :src="movieDetails.posterURL"
            cover
            max-height="400"
            max-width="300"
            class="rounded-lg"
          />
        </div>
        <div class="col-span-3">
          <h1 class="text-4xl font-semibold">{{ movieDetails.title }}</h1>
          <div class="flex items-center text-sm mt-2">
            <span>{{ formatMinutesToHourMinute(movieDetails.runtime) }}</span>
            <span class="mx-2">|</span>
            <span>{{ movieDetails.genres.join(", ") }}</span>
          </div>
          <div class="text-sm">
            <span class="text-gray-500">Director:</span>
            <span>{{
              movieDetails.directors.map((p) => p.name).join(", ")
            }}</span>
          </div>
          <h2 class="text-xl font-medium mt-4">Overview</h2>
          <p class="mt-2 tracking-wide">{{ movieDetails.overview }}</p>

          <MovieDetailsCast :cast="movieDetails.cast" class="mt-4" />
        </div>
      </div>
      <v-divider class="my-4" />
      <MovieCommentSection :movie-id="movieId" class="mt-4" />
    </v-container>
  </div>
</template>
<script setup lang="ts">
import type { MovieDetails } from "@/domain/entities/MovieDetails";
import { GetMovieDetailsUseCase } from "@/usecases/GetMovieDetailsUseCase";
import { TMDBGetMovieDetailsRepository } from "@/infrastructure/repositories/api/TMDBGetMovieDetailsRepository";
import { getTMDBClient } from "@/services/TMDBSingleton";

const props = defineProps<{
  movieId: number;
}>();

const isLoading = ref(false);
const movieDetails = ref<MovieDetails | null>(null);

const getMovieDetailsUseCase = new GetMovieDetailsUseCase(
  {
    success(data: MovieDetails) {
      movieDetails.value = data;
    },
    error(msg: string) {
      console.log(msg);
    },
  },
  new TMDBGetMovieDetailsRepository(getTMDBClient())
);

watch(
  () => props.movieId,
  async (newId: number) => {
    if (!newId) return;
    isLoading.value = true;
    await getMovieDetailsUseCase.execute(newId);
    isLoading.value = false;
  },
  {
    immediate: true,
  }
);
</script>
