<template>
    <v-card color="grey" variant="outlined">
        <v-img
            color="surface-variant"
            height="200"
            :src="movie.imageURL"
            cover
            />
           <v-chip label color="yellow" variant="tonal" class="!absolute top-0 right-0">
           {{ formatNumber(movie.voteRating) }} <v-icon class="ml-2">mdi-star</v-icon></v-chip>
        <v-card-title>{{ movie.title }}</v-card-title>
    </v-card>
</template>
<script setup lang="ts">
import type { Movie } from '@/domain/entities/Movie'
const props = defineProps<{
    movie: Movie
}>()

</script>