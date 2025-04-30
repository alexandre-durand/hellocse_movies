<template>
    <v-card max-width="300">
        <v-img
            color="surface-variant"
            height="200"
            :src="movie.imageURL"
            cover
            />
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-actions>
            <v-btn color="primary">Details</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
import type { Movie } from '@/domain/entities/Movie'
const props = defineProps<{
    movie: Movie
}>()
</script>