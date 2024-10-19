<script>
import { ref } from "vue";
import BookHandler from "./BookHandler.vue";
export default {
  components: {
    BookHandler,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const showEditForm = ref(false);
    const deleteBookCustomFunction = () => {
      emit("deleteBookCustomEvent", props.data.id);
    };
    const openEditFormFunction = () => {
      showEditForm.value = true;
    };
    const editBookCustomFunction = (bookToEdit) => {
      emit("editBookCustomEvent", {
        newBookData: bookToEdit,
        test: "successful",
      });
      showEditForm.value = false;
    };
    return {
      showEditForm,
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
      <BookHandler
        :bookHandlerData="data"
        @createOrEditBook="editBookCustomFunction"
      />
    </div>
    <div v-else>
      <p>{{ data.title }}</p>
      <span>{{ data.author }}</span>
      <span>{{ data.year }}</span>
    </div>
  </div>
</template>
