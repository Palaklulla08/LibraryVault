import { useMemo } from "react";

/**
 * Custom hook for filtering a list of books by search query and category.
 *
 * @param {Array} books - The complete array of book objects.
 * @param {Object} filters - Filtering options.
 * @param {string} filters.q - Search query (for title or author).
 * @param {string} filters.category - Category name (or 'all' for no filtering).
 *
 * @returns {Array} Filtered list of books.
 */
export default function useFilteredBooks(books, { q = "", category = "" }) {
  return useMemo(() => {
    // Normalize search query (trim whitespace + lowercase for case-insensitive search)
    const s = q.trim().toLowerCase();

    // Return filtered array of books
    return books.filter((b) => {
      // 1️⃣ Category filter
      // If a category is selected (not "all"), only include books from that category
      if (
        category &&
        category !== "all" &&
        b.category.toLowerCase() !== category.toLowerCase()
      ) {
        return false;
      }

      // 2️⃣ Search filter
      // If no search query, include the book
      if (!s) return true;

      // Otherwise, check if query matches book title or author
      return (
        b.title.toLowerCase().includes(s) ||
        b.author.toLowerCase().includes(s)
      );
    });
  }, [books, q, category]); // ✅ Dependencies — recalculate only when these values change
}
