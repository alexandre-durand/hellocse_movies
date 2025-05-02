<template>
  <div class="flex flex-col gap-4">
    <div v-if="orderedComments.length === 0" class="text-center text-gray-500">
      No comments yet.
    </div>
    <MovieCommentCard
      v-else
      v-for="comment in orderedComments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script setup lang="ts">
import type { MovieComment } from "~/domain/entities/MovieComment";

const props = defineProps<{
  comments: MovieComment[];
}>();

const orderedComments = computed(() => {
  return props.comments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});
</script>
