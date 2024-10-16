<script>
import { ref } from "vue";
import userData from "../assets/libraryData.json";
import Book from "./Book.vue";
export default {
  components: {
    Book,
  },
  setup() {
    const bookIndex = ref(null);
    const libraryData = ref(userData);
    const searchParameter = ref(null);
    const filteredLibraryData = ref([]);
    const newBook = ref({
      title: "",
      author: "",
      year: "",
    });

    const searchBook = () => {
      filteredLibraryData.value = libraryData.value.books.filter(
        (book) => book.title === searchParameter.value
      );
    };
    const addBook = () => {
      libraryData.value.books.push({ ...newBook.value });
      newBook.value.title = "";
      newBook.value.author = "";
      newBook.value.year = "";
      //newBook = new Book()
    };
    function deleteBooks(title) {
      bookIndex.value = libraryData.value.books.findIndex(
        (book) => book.title === title
      );
      if (bookIndex.value !== -1) {
        libraryData.value.books.splice(bookIndex, 1);
      }
    }
    function editBooks(oldTitle, newTitle) {
      bookIndex.value = libraryData.value.books.findIndex(
        (book) => book.title === oldTitle
      );
      if (bookIndex.value !== -1 && newTitle)
        libraryData.value.books[bookIndex].title = newTitle;
    }
    return {
      libraryData,
      addBook,
      newBook,
      searchParameter,
      searchBook,
      filteredLibraryData,
      deleteBooks,
      editBooks,
      bookIndex,
    };
  },
};
</script>

<template>
  <div>
    <div>
      <input v-model="newTitle" placeholder="Enter book title to edit" />
      <button @click="editBooks(bookTitle, newTitle)">Edit Book</button>
    </div>
    <div>
      <input v-model="bookTitle" placeholder="Enter book title to delete" />
      <button @click="deleteBooks(bookTitle)">Delete Book</button>
    </div>
    <input v-model="searchParameter" placeholder="Enter book title to search" />
    <button type="submit" @click="searchBook">Search</button>
    <div v-if="filteredLibraryData.length > 0">
      <ul>
        <li v-for="book in filteredLibraryData" :key="book.id">
          <Book :data="book" />
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="book in libraryData.books" :key="book.id">
          <Book :data="book" />
        </li>
      </ul>
      <input v-model="newBook.title" placeholder="Enter the new books title" />
      <input
        v-model="newBook.author"
        placeholder="Enter the new books author"
      />
      <VueDatePicker
        v-model="newBook.year"
        placeholder="Add year"
        year-picker
      />
      <button type="submit" @click="addBook">Save</button>
    </div>
  </div>
</template>
