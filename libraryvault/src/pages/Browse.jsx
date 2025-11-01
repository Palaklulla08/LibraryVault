// Importing necessary React and Redux hooks and components
import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom"; // For route parameters and URL query params
import { useSelector } from "react-redux"; // To access Redux store data
import BookCard from "../components/BookCard"; // Component to display individual book cards
import useFilteredBooks from "../hooks/useFilteredBooks"; // Custom hook to filter books based on query and category

// Main component for browsing and filtering books
export default function Browse() {
  // Extract 'category' parameter from the URL (e.g., /books/Fiction)
  const { category } = useParams();

  // useSearchParams helps manage query string parameters like ?q=Harry
  const [sp, setSp] = useSearchParams();

  // Extract the 'q' (query) parameter from the search string, default to empty string if not found
  const q = sp.get("q") || "";

  // Access the 'books' list from Redux store
  const books = useSelector((s) => s.books.list);

  // Get unique categories from the list of books using Set()
  const cats = Array.from(new Set(books.map((b) => b.category)));

  // Filter the books using custom hook based on search query and category
  const filtered = useFilteredBooks(books, { q, category: category || "all" });

  return (
    // Main section container for browse page
    <section className="container-lg mx-auto py-12">
      
      {/* Page heading */}
      <h1 className="text-4xl font-display text-white mb-2">
        Browse Our Collection
      </h1>

      {/* Short subtitle or intro text */}
      <p className="text-[#7A071A]mb-6">
        Discover your next favorite book from our carefully curated library.
      </p>

      {/* Search and category filter box */}
      <div className="card-glass p-6 rounded-xl mb-6">
        
        {/* Search input field */}
        <input
          value={q} // controlled input linked to query param
          onChange={(e) => setSp({ q: e.target.value })} // updates query param when user types
          placeholder="Search by title or author..."
          className="w-full p-3 rounded bg-transparent border"
        />

        {/* Category selection buttons */}
        <div className="mt-4 flex gap-3 flex-wrap">
          {/* "All" + each unique category is displayed as a link */}
          {["All", ...cats].map((c) => (
            <Link
              key={c} // unique key for each element
              to={c === "All" ? "/books" : `/books/${encodeURIComponent(c)}`} // encodes category name for safe URL
              className="px-4 py-2 rounded bg-black/30 text-[#7A071A]" // Tailwind styles for each category button
            >
              {c} {/* category name displayed on button */}
            </Link>
          ))}
        </div>
      </div>

      {/* Display total number of books found */}
      <p className="text-[#7A071A] mb-4">Found {filtered.length} books</p>

      {/* Grid layout for displaying the filtered book cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Loop over filtered books and render BookCard component for each */}
        {filtered.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
}
