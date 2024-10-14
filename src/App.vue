<script>
import { ref } from "vue";
import Books from "./components/Books.vue";
import userData from "./assets/libraryData.json";
export default {
  setup() {
    const libraryData = ref(userData);
    const searchParameter = ref("");
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
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div id="app"></div>
    <div class="wrapper">
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

      <nav>
        <RouterLink to="/">Books</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <books />
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
