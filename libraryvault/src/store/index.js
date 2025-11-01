import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice"; // Import the reducer for book-related state

// ✅ Create the Redux store
const store = configureStore({
  reducer: {
    // The "books" slice of state will be managed by booksReducer
    books: booksReducer,
  },
});

// ✅ Persist the store's book list to localStorage on every state change
store.subscribe(() => {
  try {
    // Get the current list of books from the Redux state
    const books = store.getState().books.list;

    // Save it to localStorage for persistence across page reloads
    localStorage.setItem("lv_books", JSON.stringify(books));
  } catch (e) {
    // If localStorage access fails (e.g., storage full or restricted), ignore safely
  }
});

// Export the store so it can be used in <Provider> in main.jsx
export default store;
