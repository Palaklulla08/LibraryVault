// Import React and necessary hooks/libraries
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // For Redux state and dispatch
import { addBook } from '../store/slices/booksSlice';   // Redux action to add book
import { useNavigate } from 'react-router-dom';          // For navigation after submit

// Main functional component
export default function AddBook() {
  // Redux setup
  const dispatch = useDispatch(); // Used to dispatch actions
  const navigate = useNavigate(); // Used to redirect user after form submit

  // Access global book list from Redux store
  const books = useSelector((s) => s.books.list);

  // Extract unique categories from existing books
  const categories = Array.from(new Set(books.map((b) => b.category)));

  // -----------------------------
  // Local component states
  // -----------------------------
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: categories[0] || '', // Pre-fill with first category if available
    year: '',
    pages: '',
    rating: '',
    description: '',
    isbn: '',
    publisher: '',
    language: '',
    tags: '',
  });

  // To store validation error messages
  const [err, setErr] = useState({});

  // -----------------------------
  // Handle input change dynamically
  // -----------------------------
  const onChange = (e) =>
    setForm((s) => ({
      ...s,
      [e.target.name]: e.target.value, // update field by input name
    }));

  // -----------------------------
  // Validate user inputs before submit
  // -----------------------------
  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = 'Title is required';
    if (!form.author.trim()) errors.author = 'Author is required';
    if (!form.category.trim()) errors.category = 'Category is required';
    if (!form.description.trim()) errors.description = 'Description is required';
    if (!form.rating || form.rating < 0 || form.rating > 5)
      errors.rating = 'Rating must be between 0 and 5';
    if (form.year && (isNaN(form.year) || form.year.length !== 4))
      errors.year = 'Enter a valid year';
    if (form.pages && isNaN(form.pages))
      errors.pages = 'Pages must be a number';
    return errors;
  };

  // -----------------------------
  // Handle form submission
  // -----------------------------
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent browser page reload

    // Validate the form fields
    const errors = validate();

    // If validation errors exist → show them and stop
    if (Object.keys(errors).length) {
      setErr(errors);
      return;
    }

    // Create a structured book object
    const book = {
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category.trim(),
      year: form.year ? Number(form.year) : undefined,
      pages: form.pages ? Number(form.pages) : undefined,
      rating: Number(form.rating),
      description: form.description.trim(),
      isbn: form.isbn.trim(),
      publisher: form.publisher.trim(),
      language: form.language.trim() || 'English',
      tags: form.tags
        .split(',') // convert comma-separated tags into array
        .map((t) => t.trim())
        .filter(Boolean), // remove empty tags
      cover: '/src/assets/placeholder.svg', // default book cover image
      id: Date.now(), // unique ID based on timestamp
    };

    // Dispatch the action to add book into Redux store
    dispatch(addBook(book));

    // Redirect user to "Browse Books" page
    navigate('/books');
  };

  // -----------------------------
  // JSX Template (UI Layout)
  // -----------------------------
  return (
    <div className="container-lg mx-auto py-12">
      {/* Outer wrapper card */}
      <div className="card-glass rounded-xl p-8 max-w-3xl mx-auto">
        {/* Title Section */}
        <h2 className="text-3xl font-display text-white mb-4">
          Add New Book
        </h2>

        {/* Main Form */}
        <form onSubmit={onSubmit} className="space-y-4">

          {/* ----------------- Title ----------------- */}
          <div>
            <label className="block text-sm text-[#7A071A]">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              placeholder="Book title..."
            />
            {/* Show validation error if exists */}
            {err.title && <p className="text-red-500 text-sm">{err.title}</p>}
          </div>

          {/* ----------------- Author ----------------- */}
          <div>
            <label className="block text-sm text-[#7A071A]">Author *</label>
            <input
              name="author"
              value={form.author}
              onChange={onChange}
              className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              placeholder="Author name..."
            />
            {err.author && <p className="text-red-500 text-sm">{err.author}</p>}
          </div>

          {/* ----------------- Category + Rating ----------------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm text-[#7A071A]">Category *</label>
              <input
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
                placeholder="Category..."
              />
              {err.category && (
                <p className="text-red-500 text-sm">{err.category}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm text-[#7A071A]">
                Rating (0-5) *
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                value={form.rating}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
                placeholder="4.5"
              />
              {err.rating && (
                <p className="text-red-500 text-sm">{err.rating}</p>
              )}
            </div>
          </div>

          {/* ----------------- Description ----------------- */}
          <div>
            <label className="block text-sm text-[#7A071A]">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              rows="4"
              placeholder="Write a short description..."
            />
            {err.description && (
              <p className="text-red-500 text-sm">{err.description}</p>
            )}
          </div>

          {/* ----------------- Year + Pages ----------------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Published Year */}
            <div>
              <label className="block text-sm text-[#7A071A]">
                Published Year
              </label>
              <input
                name="year"
                value={form.year}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              />
              {err.year && <p className="text-red-500 text-sm">{err.year}</p>}
            </div>

            {/* Pages */}
            <div>
              <label className="block text-sm text-[#7A071A]">Pages</label>
              <input
                name="pages"
                value={form.pages}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              />
              {err.pages && <p className="text-red-500 text-sm">{err.pages}</p>}
            </div>
          </div>

          {/* ----------------- ISBN + Publisher ----------------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* ISBN */}
            <div>
              <label className="block text-sm text-[#7A071A]">ISBN</label>
              <input
                name="isbn"
                value={form.isbn}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              />
            </div>

            {/* Publisher */}
            <div>
              <label className="block text-sm text-[#7A071A]">Publisher</label>
              <input
                name="publisher"
                value={form.publisher}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              />
            </div>
          </div>

          {/* ----------------- Language + Tags ----------------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Language */}
            <div>
              <label className="block text-sm text-[#7A071A]">Language</label>
              <input
                name="language"
                value={form.language}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-[#7A071A]">
                Tags (comma separated)
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={onChange}
                className="w-full p-3 rounded bg-transparent border border-white/10 text-[#7A071A]"
                placeholder="e.g. Classic, Mystery"
              />
            </div>
          </div>

          {/* ----------------- Submit Button ----------------- */}
          <div>
            <button
              type="submit"
              className="btn-glow w-full bg-gradient-to-r from-[#7A071A] to-[#ef5b61] text-white font-semibold py-3 rounded-lg hover:scale-[1.02] transition-all"
            >
              Add Book to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
