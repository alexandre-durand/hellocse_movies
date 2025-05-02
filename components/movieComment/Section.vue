<template>
  <div>
    <h2 class="text-xl font-medium">Comments</h2>
    <div class="flex">
      <v-spacer />
      <v-btn
        color="primary"
        variant="flat"
        @click="showAddCommentDialog = true"
      >
        Add comment</v-btn
      >
      <MovieCommentAddDialog
        v-if="showAddCommentDialog"
        v-model:show="showAddCommentDialog"
        :movie-id="movieId"
        @close="showAddCommentDialog = false"
        @addComment="addComment"
      />
    </div>

    <MovieCommentList :comments="comments" class="mt-4" />
  </div>
</template>

<script lang="ts" setup>
import type { MovieComment } from "~/domain/entities/MovieComment";
import { LocalStorageMovieCommentRepository } from "~/infrastructure/repositories/localStorage/LocalStorageMovieCommentRepository";
import { GetMovieCommentsUseCase } from "~/usecases/GetMovieCommentsUseCase";

const props = defineProps<{
  movieId: number;
}>();
const showAddCommentDialog = ref(false);
const comments = ref<MovieComment[]>([]);

const getMovieCommentsUseCase = new GetMovieCommentsUseCase(
  {
    success(data: MovieComment[]) {
      comments.value = data;
    },
    error(msg: string) {
      console.log(msg);
    },
  },
  new LocalStorageMovieCommentRepository()
);

getMovieCommentsUseCase.execute(props.movieId);

const addComment = (comment: MovieComment) => {
  comments.value.push(comment);
};
</script>
