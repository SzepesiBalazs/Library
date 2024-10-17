<script>
import { ref } from "vue";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const title = ref(props.data.title.toUpperCase());
    const deleteBookCustomFunction = () => {
      emit("deleteBookCustomEvent", props.data.id);
    };
    return {
      title,
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
    <p>{{ title }}</p>
    <span>{{ data.author }}</span>
    <span>{{ data.year }}</span>
  </div>
</template>
