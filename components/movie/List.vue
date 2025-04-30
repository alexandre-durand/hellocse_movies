<template>
    <div class="flex flex-row flex-wrap gap-4 justify-center">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
</template>

<script setup lang="ts">
    import type { Movie } from '@/domain/entities/Movie'
    import { FetchMoviesUseCase } from '@/usecases/FetchMoviesUseCase'
    import { TMDBFetchMoviesRepository } from '@/infrastructure/repositories/api/TMDBFetchMoviesRepository'
    import { TMDBSingleton } from '@/services/TMDBSingleton'
    import { useInfiniteMovies } from '../../composables/useInfiniteMovies'
    import { MockFetchMoviesRepository } from '@/infrastructure/repositories/mock/MockFetchMoviesRepository'

    const { movies, isLoading, fetchNextPage } = useInfiniteMovies(new MockFetchMoviesRepository(10)) // useInfiniteMovies(new TMDBFetchMoviesRepository(TMDBSingleton.getInstance()))

    onMounted(() => {
        fetchNextPage(); 
    });
   
</script>