<template>
  <v-img :src="movie.backdropURL" height="300" cover class="relative">
    <v-btn
      icon
      variant="tonal"
      color="white"
      class="absolute top-4 left-4"
      to="/"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-chip label color="white" variant="flat" class="!absolute top-4 right-4">
      {{ formatNumberWithOneDigit(movie.voteRating) }}
      <v-icon class="ml-1 mr-2">mdi-star</v-icon>
      <i class="text-xs">({{ movie.voteCount }})</i>
    </v-chip>
  </v-img>
</template>
<script setup lang="ts">
import type { MovieDetails } from "@/domain/entities/MovieDetails";

const props = defineProps<{
  movie: MovieDetails;
}>();
</script>
