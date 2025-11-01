import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function NotFound() {
  // useLocation hook gives us the current URL path (useful to show which page was not found)
  const location = useLocation();

  return (
    // Full-page container centered both vertically and horizontally
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff1e6] dark:bg-[#0f0f0f] text-center px-6">
      
      {/* Big 404 heading for visual emphasis */}
      <h1 className="text-8xl font-bold text-[#7A071A] mb-4">404</h1>

      {/* Subheading to describe the error */}
      <h2 className="text-3xl font-semibold text-[#7A071A] mb-2">
        Page Not Found
      </h2>

      {/* Message explaining that the requested page doesn’t exist */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        The requested page{" "}
        {/* Highlighting the actual wrong path entered by the user */}
        <span className="font-semibold text-[#7A071A]">
          {location.pathname}
        </span>{" "}
        does not exist.
      </p>

      {/* Button to take the user back to the home page */}
      <Link
        to="/"
        className="bg-[#7A071A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5a0015] transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
