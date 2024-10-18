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
      localBook,
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
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm"
          >New book title:</span
        >
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          v-model="localBook.title"
        />
      </div>
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm"
          >New book author:</span
        >
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
          v-model="localBook.author"
        />
      </div>
      <VueDatePicker
        v-model="localBook.year"
        placeholder="Add year"
        year-picker
      />
      <button class="btn btn-primary" type="submit" @click="addBook">
        Save
      </button>
    </div>
  </div>
</template>
