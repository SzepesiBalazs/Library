<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import Book from "./components/book.js";
export default {
  components: {
    FormComponent: Form,
    Field,
    ErrorMessageComponent: ErrorMessage,
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
  <FormComponent @submit="handleSubmit">
    <div class="input-group input-group-sm mb-3">
      <span
        class="input-group-text border border-dark"
        id="inputGroup-sizing-sm"
        style="background-color: burlywood; color: black"
        >New book title:</span
      >
      <Field
        name="title"
        type="text"
        class="form-control border border-dark"
        style="background-color: lightgreen"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.title"
        rules="required|minMax:3,20"
      />
      <ErrorMessageComponent name="title">
        <template #default="{ message }">
          <div class="bg-danger text-white p-2 mt-1 rounded">
            {{ message }}
          </div>
        </template>
      </ErrorMessageComponent>
    </div>
    <div class="input-group input-group-sm mb-3">
      <span
        class="input-group-text border border-dark"
        id="inputGroup-sizing-sm"
        style="background-color: burlywood; color: black"
        >New book author:</span
      >
      <Field
        name="author"
        type="text"
        class="form-control border border-dark"
        style="background-color: lightgreen"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        v-model="localBook.author"
        rules="required|minMax:3,20"
      />
      <ErrorMessageComponent name="author">
        <template #default="{ message }">
          <div class="bg-danger text-white p-2 mt-1 rounded">
            {{ message }}
          </div>
        </template>
      </ErrorMessageComponent>
    </div>
    <VueDatePicker
      name="year"
      v-model="localBook.year"
      placeholder="Add year"
      year-picker
      rules="required"
    />
    <ErrorMessageComponent name="year">
      <template #default="{ message }">
        <div class="bg-danger text-white p-2 mt-1 rounded">
          {{ message }}
        </div>
      </template>
    </ErrorMessageComponent>
    <button class="btn btn-success border-dark" type="submit">Save</button>
  </FormComponent>
</template>
