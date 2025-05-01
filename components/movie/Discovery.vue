<template>
    <v-infinite-scroll
        @load="onLoad"
        class="w-full"
        color="primary">
        <MovieList :movies="movies" />
    </v-infinite-scroll>
</template>

<script setup lang="ts">
    import type { Movie } from '@/domain/entities/Movie'
    import type { PageResult } from '~/domain/entities/PageResult'
    import { FetchMoviesUseCase } from '@/usecases/FetchMoviesUseCase'
    import { TMDBFetchMoviesRepository } from '@/infrastructure/repositories/api/TMDBFetchMoviesRepository'
    import { TMDBSingleton } from '@/services/TMDBSingleton'
    import { MockFetchMoviesRepository } from '@/infrastructure/repositories/mock/MockFetchMoviesRepository'

    const fetchMoviesRepository = new MockFetchMoviesRepository({
        itemsPerPage: 5,
        totalPages: 3
    }) // new TMDBFetchMoviesRepository(TMDBSingleton.getInstance()

    const { 
        items: movies,
        hasMorePages,
        handlePageResult,
        fetchNextPage
    } = useInfiniteItems<Movie>();

    const usecase = new FetchMoviesUseCase({
        success(data: PageResult<Movie>) {
        handlePageResult(data);
        },
        error(msg: string) {
            console.error(msg);
        },
    }, fetchMoviesRepository);

    async function fetchNextMovies() {
        await fetchNextPage((page: number) => usecase.execute(page));
    }

    const onLoad = ({done}) => {
        fetchNextMovies()
        if (hasMorePages.value) {
            done('ok')
        } else {
            done('empty')
        }
    }

    onMounted(async () => {
        await fetchNextMovies(); 
    });
   
</script>