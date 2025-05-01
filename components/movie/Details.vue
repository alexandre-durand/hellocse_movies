<template>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
        loading...
    </div>
    <div v-if="movieDetails">
        <div class="relative">
            <v-img :src="movieDetails.backdropURL" height="300" cover>
                <v-chip label color="white" variant="flat" class="!absolute top-4 right-4">
                    {{ formatNumberWithOneDigit(movieDetails.voteRating) }} <v-icon class="ml-1 mr-2">mdi-star</v-icon>
                    <i class="text-xs">({{movieDetails.voteCount}})</i>
                </v-chip>
            </v-img>
            
            <v-container>
                <div class="grid grid-cols-4 gap-4">
                    <div class="col-span-1"><v-img :src="movieDetails.posterURL" cover max-height="300" width="200" class="rounded-lg"></v-img></div>
                    <div class="col-span-3">
                         <h1 class="text-4xl font-semibold">{{ movieDetails.title }}</h1>
                         <div class="flex items-center text-sm mt-2">
                            <span>{{formatMinutesToHourMinute(movieDetails.runtime)}}</span>
                            <span class="mx-2">|</span>
                            <span>{{ movieDetails.genres.join(', ') }}</span>
                        </div>
                        <div class="text-sm">
                            <span class="text-gray-500">Director:</span> <span>{{movieDetails.directors.map(p => p.name).join(', ')}}</span>
                        </div>
                        <h2 class="text-xl font-medium mt-4">Overview</h2>
                        <p class="mt-2 tracking-wide">{{ movieDetails.overview }}</p>

                        <h2 class="text-xl font-medium mt-4">Casts</h2>
                        <div class="overflow-x-auto mt-4 flex gap-4">
                            <div v-for="actor in movieDetails.cast" :key="actor.id" class="flex flex-col items-center  text-center">
                                <v-img :src="actor.profileURL" cover max-height="150" width="100" class="rounded-lg"></v-img>
                                <span class="text-sm mt-2">{{ actor.name }}</span>
                                <span class="text-xs text-gray-500">{{ actor.character }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4">
                    <h2 class="text-xl font-medium">Comments</h2>
                </div>
            </v-container>
        </div>        
    </div>
</template>
<script setup lang="ts">
import type {MovieDetails} from '@/domain/entities/MovieDetails'
import {GetMovieDetailsUseCase} from '@/usecases/GetMovieDetailsUseCase'
import {TMDBGetMovieDetailsRepository} from '@/infrastructure/repositories/api/TMDBGetMovieDetailsRepository'
import {TMDBSingleton} from '@/services/TMDBSingleton'

const props = defineProps<{
    movieId: number
}>()

const isLoading = ref(false)
const movieDetails = ref<MovieDetails | null>(null)

const getMovieDetailsUseCase = new GetMovieDetailsUseCase({
    success(data: MovieDetails) {
        movieDetails.value = data
    },
    error(msg: string) {
        console.log(msg)
    }
}, new TMDBGetMovieDetailsRepository(TMDBSingleton.getInstance())) 

watch(() => props.movieId, async (newId) => {
    if (!newId) return
    isLoading.value = true
    await getMovieDetailsUseCase.execute(newId)
    isLoading.value = false
}, {
    immediate: true
})
</script>