import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

export default function Home() {
  // Get all books from Redux store
  const books = useSelector((s) => s.books.list);

  // Extract all unique categories from the book list
  const categories = Array.from(new Set(books.map((b) => b.category)));

  // Sort books by rating (highest first) and show top 4 as "Popular Books"
  const popular = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);

  // Calculate average rating across all books
  const avgRating =
    books.length > 0
      ? (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1)
      : 0;

  return (
    <main className="min-h-screen">
      {/* ===================== HERO SECTION ===================== */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center rounded-b-3xl overflow-hidden"
        style={{ backgroundImage: "url('/src/assets/library-bg.jpg')" }} // Background image for hero
      >
        {/* A semi-transparent overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-[2px]" />

        {/* Hero content - Title, description and buttons */}
        <div className="relative z-10 container-lg mx-auto px-6 text-center text-white max-w-3xl">
          <h1 className="text-6xl font-display font-extrabold drop-shadow-md">
            Welcome to <span className="text-[#7A071A]">LibraryVault</span>
          </h1>

          {/* Subheading below the title */}
          <p className="mt-6 text-[#7A071A]-200/80 text-lg">
            Discover your next great read in our curated collection of books.
          </p>

          {/* Buttons for navigation: Browse and Add Book */}
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            {/* Button to navigate to the book collection */}
            <Link
              to="/books"
              className="btn-glow bg-gradient-to-r from-[#ef5b61] to-[#7a071a] text-white px-6 py-3 rounded-lg font-semibold hover:scale-[1.05] transition-all duration-300 shadow-lg"
            >
              Browse Collection
            </Link>

            {/* Button to navigate to the Add New Book page */}
            <Link
              to="/add"
              className="px-6 py-3 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 hover:scale-[1.05] transition-all duration-300"
            >
              Add New Book
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== STATS SECTION ===================== */}
      <section className="container-lg mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Books Count */}
          <div className="card-glass p-8 rounded-xl text-center">
            <div className="text-4xl font-display text-[#7A071A]">
              {books.length}
            </div>
            <div className="text-sm text-[#7A071A]-300 mt-2">
              Books Available
            </div>
          </div>

          {/* Total Categories */}
          <div className="card-glass p-8 rounded-xl text-center">
            <div className="text-4xl font-display text-[#7A071A]">
              {categories.length}
            </div>
            <div className="text-sm text-[#7A071A]-300 mt-2">Categories</div>
          </div>

          {/* Average Rating across all books */}
          <div className="card-glass p-8 rounded-xl text-center">
            <div className="text-4xl font-display text-[#7A071A]">
              {avgRating}
            </div>
            <div className="text-sm text-[#7A071A]-300 mt-2">
              Average Rating
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORIES SECTION ===================== */}
      <section className="bg-[#fff1e6] dark:bg-[#0f0f0f] py-16 px-6">
        <div className="container-lg mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-[#7A071A] mb-8">
            Explore Book Categories
          </h2>

          {/* Show categories dynamically; if no books exist, show defaults */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {(
              Array.from(new Set(books.map((b) => b.category))).length > 0
                ? Array.from(new Set(books.map((b) => b.category)))
                : [
                    "Fiction",
                    "Non-Fiction",
                    "Sci-Fi",
                    "Mystery",
                    "Fantasy",
                    "Romance",
                  ]
            ).map((cat, index) => (
              <Link
                key={index}
                to={`/books/${cat}`} // Navigate to filtered book list by category
                className="bg-white/80 dark:bg-[#1a1a1a] border border-[#7A071A]/20 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 text-[#7A071A] font-semibold text-lg"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== POPULAR BOOKS SECTION ===================== */}
      <section className="container-lg mx-auto py-12 px-6">
        <h2 className="text-3xl font-display text-[#7A071A] mb-6">
          Popular Books
        </h2>

        {/* Display top-rated books as BookCard components */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {popular.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>
    </main>
  );
}
