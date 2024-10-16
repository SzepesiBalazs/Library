<script>
import { ref } from "vue";
import userData from "../assets/libraryData.json";
export default {
  setup() {
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
    };
    function deleteBooks(title) {
      libraryData.value.books.splice(title, 1);
    }
    return {
      libraryData,
      addBook,
      newBook,
      searchParameter,
      searchBook,
      filteredLibraryData,
    };
  },
};
</script>

<template>
  <div>
    <input v-model="searchParameter" />
    <button type="submit" @click="searchBook">Search</button>
    <div v-if="filteredLibraryData.length > 0">
      <ul>
        <li v-for="book in filteredLibraryData" :key="book.id">
          <p>{{ book.title }}</p>
          <span>{{ book.author }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="book in libraryData.books" :key="book.id">
          <p>{{ book.title }}</p>
          <span>{{ book.author }}</span>
        </li>
      </ul>
      <input v-model="newBook.title" />
      <input v-model="newBook.author" />
      <VueDatePicker v-model="newBook.year" year-picker />
      <button type="submit" @click="addBook">Save</button>
    </div>
  </div>
</template>
