<script>
import { ref } from "vue";
import userData from "../assets/libraryData.json";
import BookComponent from "./Book.vue";
import Book from "./components/book.js";
export default {
  components: {
    BookComponent,
  },
  setup() {
    const libraryData = ref(userData);
    const searchParameter = ref(null);
    const filteredLibraryData = ref([]);
    const localBook = ref(new Book());
    const searchBook = () => {
      filteredLibraryData.value = libraryData.value.books.filter(
        (book) => book.title === searchParameter.value
      );
    };
    const addBook = () => {
      let maxId = Math.max(...libraryData.value.books.map((book) => book.id));
      localBook.value.id = maxId + 1;
      //console.log("maxId ", maxId);
      libraryData.value.books.push({ ...localBook.value });
      localBook.value = new Book();
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
    function editBooks(oldTitle, newTitle) {
      const bookIndex = libraryData.value.books.findIndex(
        (book) => book.title === oldTitle
      );
      if (bookIndex !== -1 && newTitle)
        libraryData.value.books[bookIndex].title = newTitle;
    }
    return {
      libraryData,
      addBook,
      localBook,
      searchParameter,
      searchBook,
      filteredLibraryData,
      deleteBookInParent,
      editBooks,
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
          />
        </li>
      </ul>
      <input
        v-model="localBook.title"
        placeholder="Enter the new books title"
      />
      <input
        v-model="localBook.author"
        placeholder="Enter the new books author"
      />
      <VueDatePicker
        v-model="localBook.year"
        placeholder="Add year"
        year-picker
      />
      <button type="submit" @click="addBook">Save</button>
    </div>
  </div>
</template>
