<script>
import { ref } from "vue";
import Book from "./components/book.js";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const showEditForm = ref(false);
    const bookToEdit = new Book(
      props.data.title,
      props.data.author,
      props.data.year,
      props.data.id
    );
    const deleteBookCustomFunction = () => {
      emit("deleteBookCustomEvent", props.data.id);
    };
    const openEditFormFunction = () => {
      showEditForm.value = true;
    };
    const editBookCustomFunction = () => {
      emit("editBookCustomEvent", {
        newBookData: bookToEdit,
        test: "successful",
      });
      showEditForm.value = false;
    };
    return {
      showEditForm,
      bookToEdit,
      editBookCustomFunction,
      openEditFormFunction,
      deleteBookCustomFunction,
    };
  },
};
</script>

<template>
  <div>
    <button
      @click="deleteBookCustomFunction"
      type="button"
      class="btn btn-primary"
    >
      X
    </button>
    <button @click="openEditFormFunction" type="button" class="btn btn-warning">
      Edit
    </button>
    <div v-if="showEditForm">
      <input
        type="text"
        class="form-control"
        placeholder=""
        v-model="bookToEdit.title"
      />
      <input
        type="text"
        class="form-control"
        placeholder=""
        v-model="bookToEdit.author"
      />
      <input
        type="text"
        class="form-control"
        placeholder=""
        v-model="bookToEdit.year"
      />
      <button
        class="btn btn-primary"
        type="submit"
        @click="editBookCustomFunction"
      >
        Save edit
      </button>
    </div>
    <div v-else>
      <p>{{ data.title }}</p>
      <span>{{ data.author }}</span>
      <span>{{ data.year }}</span>
    </div>
  </div>
</template>
