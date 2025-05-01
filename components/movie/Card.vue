<template>
  <v-card variant="outlined" :to="`/movies/${movie.id}`">
    <v-img height="200" :src="movie.posterURL" cover />
    <v-chip label color="white" variant="flat" class="!absolute top-2 right-2">
      {{ formatNumberWithOneDigit(movie.voteRating) }}
      <v-icon class="ml-1">mdi-star</v-icon></v-chip
    >
    <v-card-title>{{ movie.title }}</v-card-title>
  </v-card>
</template>
<script setup lang="ts">
import type { Movie } from "@/domain/entities/Movie";
defineProps<{
  movie: Movie;
}>();
</script>
