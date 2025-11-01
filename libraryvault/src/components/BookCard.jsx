import React from "react";
import { Link } from "react-router-dom";

// This component displays a single book's information in a card layout.
// It receives one prop: "book", which contains details like title, author, etc.
export default function BookCard({ book }) {
  return (
    // Outer card container with rounded corners, padding, and glass-like styling
    <article className="card-glass rounded-xl p-6 shadow-md border border-white/5 card-hover flex flex-col">
      
      {/* Top section: shows category badge and book rating */}
      <div className="flex items-center justify-between mb-3">
        {/* Category tag */}
        <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-[#7A071A] font-semibold">
          {book.category}
        </span>

        {/* Rating (formatted to one decimal place) */}
        <div className="text-sm text-yellow-400">
          ★ {book.rating.toFixed(1)}
        </div>
      </div>

      {/* Main content area for title, author, and description */}
      <div className="flex-1">
        {/* Book title */}
        <h3 className="text-xl font-display font-bold mb-1 text-brand-deep dark:text-brand-beige">
          {book.title}
        </h3>

        {/* Author name */}
        <p className="text-sm text-[#7A071A] dark:text-[#FEFCE8] mb-3">
          by {book.author}
        </p>

        {/* Short description — limited to 4 lines using "line-clamp-4" */}
        <p className="text-sm text-[#7A071A] dark:text-[#FEFCE8] mb-4 line-clamp-4">
          {book.description}
        </p>
      </div>

      {/* Bottom section: shows year, pages, and "View Details" link */}
      <div className="flex items-center justify-between mt-4">
        {/* Year and page count */}
        <div className="text-xs text-[#7A071A] dark:text-[#FEFCE8]">
          📅 {book.year} • 📖 {book.pages}
        </div>

        {/* Button link to the book details page */}
        <Link to={`/book/${book.id}`} className="btn-glow">
          View Details
        </Link>
      </div>
    </article>
  );
}
