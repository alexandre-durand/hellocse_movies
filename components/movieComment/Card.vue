<template>
  <v-card class="mb-4" variant="outlined">
    <div class="grid grid-cols-5 gap-4 p-4">
      <div class="col-span-2">
        <div class="text-sm font-semibold">{{ comment.userName }}</div>
        <div class="text-xs text-gray-500 mt-2">
          {{ formatDate(comment.createdAt) }}
        </div>
        <div class="flex items-center mt-2">
          <span class="text-sm">{{ comment.rating }}</span>
          <v-icon class="ml-1" color="primary">mdi-star</v-icon>
        </div>
      </div>
      <div class="col-span-3">
        {{ comment.message }}
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { MovieComment } from "@/domain/entities/MovieComment";

defineProps<{
  comment: MovieComment;
}>();
</script>
