<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Book from "./components/book.js";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    bookHandlerData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const existingBook = props.bookHandlerData;
    const localBook = existingBook?.id > 0 ? existingBook : new Book();
    const handleSubmit = () => {
      emit("createOrEditBook", localBook);
    };
    return { localBook, handleSubmit };
  },
};
</script>

<template>
  <Form @submit="handleSubmit">
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >New book title:</span
      >
      <Field
        name="title"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.title"
        rules="required|minMax:3,20"
      />
      <ErrorMessage name="title">
        <template #default="{ message }">
          <div class="bg-danger text-white p-2 mt-1 rounded">
            {{ message }}
          </div>
        </template>
      </ErrorMessage>
    </div>
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >New book author:</span
      >
      <Field
        name="author"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.author"
        rules="required|minMax:3,20"
      />
      <ErrorMessage name="author">
        <template #default="{ message }">
          <div class="bg-danger text-white p-2 mt-1 rounded">
            {{ message }}
          </div>
        </template>
      </ErrorMessage>
    </div>
    <VueDatePicker
      name="year"
      v-model="localBook.year"
      placeholder="Add year"
      year-picker
      rules="required"
    />
    <ErrorMessage name="year">
      <template #default="{ message }">
        <div class="bg-danger text-white p-2 mt-1 rounded">
          {{ message }}
        </div>
      </template>
    </ErrorMessage>
    <button class="btn btn-primary" type="submit">Save</button>
  </Form>
</template>
