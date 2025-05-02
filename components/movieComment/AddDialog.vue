<template>
  <v-dialog v-model="show" max-width="600px" persistent>
    <form @submit.prevent="onSubmit">
      <v-card title="Add movie comment">
        <v-card-text class="flex flex-col gap-4">
          <v-text-field
            v-model="userName"
            label="User Name"
            placeholder="Enter your name"
            variant="outlined"
            counter="50"
            required
            dense
            :error="userNameError !== ''"
            :error-messages="userNameError"
          />

          <v-textarea
            v-model="message"
            required
            label="Message"
            variant="outlined"
            placeholder="Enter your message"
            counter="500"
            :error="messageError !== ''"
            :error-messages="messageError"
          />

          <v-input :error="ratingError !== ''" :error-messages="ratingError">
            <v-rating
              v-model="rating"
              :length="10"
              hover
              :size="30"
              label="Rating"
              color="dark"
            />
          </v-input>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="closeModal">Close</v-btn>
          <v-spacer />

          <v-btn type="submit" color="primary" variant="flat">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script setup lang="ts">
import type { MovieComment } from "~/domain/entities/MovieComment";
import { LocalStorageMovieCommentRepository } from "~/infrastructure/repositories/localStorage/LocalStorageMovieCommentRepository";
import { AddMovieCommentUseCase } from "~/usecases/AddMovieCommentUseCase";

const props = defineProps<{
  movieId: number;
}>();

const emit = defineEmits<{
  close: [];
  addComment: [comment: MovieComment];
}>();

const show = ref(true);

const userName = ref<string>("");
const message = ref<string>("");
const rating = ref<number>(0);

const userNameError = ref<string>("");
const messageError = ref<string>("");
const ratingError = ref<string>("");

const resetErrors = () => {
  userNameError.value = "";
  messageError.value = "";
  ratingError.value = "";
};

const closeModal = () => {
  emit("close");
};
const addCommentUseCase = new AddMovieCommentUseCase(
  {
    success(comment: MovieComment) {
      emit("addComment", comment);
      closeModal();
    },
    error(msg: string) {
      console.log(msg);
    },
    invalidMessage(msg: string) {
      messageError.value = msg;
    },
    invalidUserName(msg: string) {
      userNameError.value = msg;
    },
    invalidRating(msg: string) {
      ratingError.value = msg;
    },
  },
  new LocalStorageMovieCommentRepository()
);

const onSubmit = async () => {
  resetErrors();

  await addCommentUseCase.execute({
    movieId: props.movieId,
    userName: userName.value,
    message: message.value,
    rating: rating.value,
  });
};
</script>
