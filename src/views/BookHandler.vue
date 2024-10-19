<script>
import { ref } from "vue";
import Book from "./components/book.js";
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const localBook = new Book();
    const handleSubmit = () => {
      emit("createOrEditBook", localBook);
    };
    return { localBook, handleSubmit };
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >New book title:</span
      >
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.title"
      />
    </div>
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >New book author:</span
      >
      <input
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.author"
      />
    </div>
    <VueDatePicker
      v-model="localBook.year"
      placeholder="Add year"
      year-picker
    />
    <button class="btn btn-primary" type="submit">Save</button>
  </form>
</template>
