<script>
import { ref } from "vue";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const title = ref(props.data.title.toUpperCase());

    return {
      title,
    };
  },
};
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <span>{{ data.author }}</span>
  </div>
</template>
