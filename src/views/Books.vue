<script>
import { ref } from "vue";
import userData from "../assets/libraryData.json";
import BookComponent from "./Book.vue";
import Book from "./components/book.js";
import BookHandler from "./BookHandler.vue";
export default {
  components: {
    BookComponent,
    BookHandler,
  },
  setup() {
    const libraryData = ref(userData);
    const searchParameter = ref(null);
    const filteredLibraryData = ref([]);
    const searchBook = () => {
      filteredLibraryData.value = libraryData.value.books.filter(
        (book) => book.title === searchParameter.value
      );
    };
    const addBook = (localBook) => {
      console.log("test", localBook);
      let maxId = Math.max(...libraryData.value.books.map((book) => book.id));
      localBook.id = maxId + 1;
      libraryData.value.books.push({ ...localBook });
      localBook = new Book();
    };
    function deleteBookInParent(id) {
      console.log("id from child", id);
      const bookIndex = libraryData.value.books.findIndex(
        (book) => book.id === id
      );
      if (bookIndex !== -1) {
        libraryData.value.books.splice(bookIndex, 1);
      }
    }
    function editBookInParent(emitedDataFromChild) {
      //console.log("test", emitedDataFromChild.newBookData.title);
      const bookIndex = libraryData.value.books.findIndex(
        (book) => book.id === emitedDataFromChild.newBookData.id
      );
      libraryData.value.books[bookIndex] = emitedDataFromChild.newBookData;
    }
    return {
      libraryData,
      addBook,
      searchParameter,
      searchBook,
      filteredLibraryData,
      deleteBookInParent,
      editBookInParent,
    };
  },
};
</script>

<template>
  <div>
    <input v-model="searchParameter" placeholder="Enter book title to search" />
    <button type="submit" @click="searchBook">Search</button>
    <div v-if="filteredLibraryData.length > 0">
      <ul>
        <li v-for="book in filteredLibraryData" :key="book.id">
          <BookComponent
            :data="book"
            @deleteBookCustomEvent="deleteBookInParent"
          />
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="book in libraryData.books" :key="book.id">
          <BookComponent
            :data="book"
            @deleteBookCustomEvent="deleteBookInParent"
            @editBookCustomEvent="editBookInParent"
          />
        </li>
      </ul>
    </div>
    <BookHandler @createOrEditBook="addBook" />
  </div>
</template>
