<template>
    <v-infinite-scroll
        @load="onLoad"
        class="w-full"
        color="primary">
        <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
    </v-infinite-scroll>
</template>

<script setup lang="ts">
    import type { Movie } from '@/domain/entities/Movie'
    import { FetchMoviesUseCase } from '@/usecases/FetchMoviesUseCase'
    import { TMDBFetchMoviesRepository } from '@/infrastructure/repositories/api/TMDBFetchMoviesRepository'
    import { TMDBSingleton } from '@/services/TMDBSingleton'
    import { useInfiniteMovies } from '../../composables/useInfiniteMovies'
    import { MockFetchMoviesRepository } from '@/infrastructure/repositories/mock/MockFetchMoviesRepository'

    const { movies, isLoading, hasMorePages,  fetchNextPage } = useInfiniteMovies(new MockFetchMoviesRepository({
        itemsPerPage: 5,
        totalPages: 3
    })) // useInfiniteMovies(new TMDBFetchMoviesRepository(TMDBSingleton.getInstance()))

    const onLoad = ({done}) => {
        fetchNextPage()
        if (hasMorePages.value) {
            done('ok')
        } else {
            done('empty')
        }
    }

    onMounted(() => {
        fetchNextPage(); 
    });
   
</script>