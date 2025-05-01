<template>
    <MovieDetails :movie-id="movieId" />
</template>

<script setup lang="ts">
const route = useRoute()


const movieId = computed(() => {
    return route.params.id
})
</script>