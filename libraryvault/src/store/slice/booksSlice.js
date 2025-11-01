import { createSlice, nanoid } from "@reduxjs/toolkit";
import initial from "../../data/books"; // Default book data (used when there's no saved data)

// Try to load previously saved books from localStorage
let persisted = [];
try {
  const raw = localStorage.getItem("lv_books");
  if (raw) persisted = JSON.parse(raw);
} catch (e) {
  // Ignore errors (e.g., invalid JSON or localStorage blocked)
}

// If persisted books exist, use them — otherwise fall back to initial data
const books = persisted.length ? persisted : initial;

// ✅ Create a Redux slice to handle book-related state and actions
const slice = createSlice({
  name: "books", // Slice name (used in Redux DevTools)
  initialState: {
    list: books, // Main state — an array of book objects
  },
  reducers: {
    // 🟩 1. Add a new book
    addBook: {
      // "reducer" handles the actual state update
      reducer(state, action) {
        // Add the new book to the beginning of the list
        state.list.unshift(action.payload);
      },
      // "prepare" allows us to customize the payload before dispatch
      prepare(book) {
        return {
          payload: {
            id: nanoid(), // Generate a unique ID automatically
            favorite: false, // Default favorite state
            ...book, // Merge user-provided book details (title, author, etc.)
          },
        };
      },
    },

    // 🟦 2. Toggle favorite status for a specific book
    toggleFavorite(state, action) {
      // Find the book by ID
      const b = state.list.find((x) => x.id === action.payload);

      // If found, flip its "favorite" value (true <-> false)
      if (b) b.favorite = !b.favorite;
    },
  },
});

// Export the action creators (for dispatching in components)
export const { addBook, toggleFavorite } = slice.actions;

// Export the reducer to include in store.js
export default slice.reducer;
