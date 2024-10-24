import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import Books from "../../views/Books.vue";
import Book from "../../views/components/book";
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
  it("adds new book", () => {
    const wrapper = mount(Books);
    const originalLibraryData = wrapper.vm.libraryData.books.length;

    wrapper.vm.addBook(new Book());
    const newLibraryData = wrapper.vm.libraryData.books.length;

    expect(originalLibraryData + 1).toEqual(newLibraryData);
  });
  it("delete book", () => {
    const wrapper = mount(Books);
    const originalLibraryData = wrapper.vm.libraryData.books.length;
    const id = wrapper.vm.libraryData.books[0].id;

    wrapper.vm.deleteBookInParent(id);
    const newLibraryData = wrapper.vm.libraryData.books.length;

    expect(originalLibraryData - 1).toEqual(newLibraryData);
  });
  it("edit book", () => {
    const wrapper = mount(Books);
    const oldBook = wrapper.vm.libraryData.books[0];
    const newBook = new Book(
      "newBookTitle",
      "newBookAuthor",
      "newBookYear",
      oldBook.id
    );

    wrapper.vm.editBookInParent({ newBookData: newBook });
    const updatedBook = wrapper.vm.libraryData.books[0];

    expect(updatedBook.title).toEqual(newBook.title);
  });
});
