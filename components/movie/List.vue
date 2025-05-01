<template>
    <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
</template>

<script setup lang="ts">
    import type { Movie } from '@/domain/entities/Movie'
    
    const props = defineProps<{
        movies: Movie[]
    }>()
</script>