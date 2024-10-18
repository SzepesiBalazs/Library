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
    const editBookCustomFunction = () => {
      emit("editBookCustomEvent", props.data.id);
    };
    return {
      title,
      editBookCustomFunction,
    };
  },
};
</script>
