import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import Books from "../../views/Books.vue";
import { ErrorMessage, Field } from "vee-validate";

vi.mock("vee-validate", () => ({
  useForm: () => ({
    handleSubmit: (callback) => (e) => {
      e.preventDefault();
      callback();
    },
  }),
  useField: () => ({
    field: { value: "" },
    meta: {},
  }),
  Form: {
    name: "Form",
  },
  Field: {
    name: "Field",
  },
  ErrorMessage: {
    name: "ErrorMessage",
  },
}));
describe("Books", () => {
  it("renders properly", () => {
    const wrapper = mount(Books);
    expect(wrapper.text()).toContain("Szepesi Sanyi");
  });
});
