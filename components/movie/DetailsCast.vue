<template>
  <div>
    <h2 class="text-xl font-medium mt-4">Casts</h2>
    <div class="overflow-x-auto mt-4 flex gap-4">
      <div
        v-for="actor in cast"
        :key="actor.id"
        class="flex flex-col items-center text-center"
      >
        <v-img
          :src="actor.profileURL"
          cover
          max-height="150"
          width="100"
          class="rounded-lg"
        />
        <span class="text-sm mt-2">{{ actor.name }}</span>
        <span class="text-xs text-gray-500">{{ actor.character }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Actor } from "@/domain/entities/MovieDetails";

const props = defineProps<{
  cast: Actor[];
}>();
</script>
