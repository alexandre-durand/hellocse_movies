<template>
    <div>
        <v-app-bar app elevation="1" color="primary">
            <v-toolbar-title>HelloCSE movies</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Search movies"
                variant="solo"
                hide-details
                single-line
                clearable
                class="mr-4"
            ></v-text-field>
        </v-app-bar>
        <v-main> 
            <v-container fluid>
                <component :is="moviesComponents" :search="search" />
            </v-container>
        </v-main>
    </div>
</template>

<script setup lang="ts">
import { MovieDiscovery, MovieSearch } from '#components';

    const search = ref('');

    const moviesComponents = computed(() => {
        if (search.value && search.value !== '') {
            return MovieSearch 
        }
        
        return MovieDiscovery
    });
</script>