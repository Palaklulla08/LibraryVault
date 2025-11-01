import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for theme toggle (sun/moon)

// Header component — contains the top navigation bar and theme toggle
export default function Header() {
  // State to manage theme mode (light or dark)
  const [theme, setTheme] = useState(() => {
    try {
      // Try to get the saved theme from localStorage, default to "light" if not found
      return localStorage.getItem("lv_theme") || "light";
    } catch (e) {
      return "light";
    }
  });

  // Effect runs whenever the theme changes
  useEffect(() => {
    try {
      // Add or remove the "dark" class on <html> to enable dark mode styles
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Persist the selected theme in localStorage
      localStorage.setItem("lv_theme", theme);
    } catch (e) {
      // Fail silently if localStorage or DOM access fails
    }
  }, [theme]);

  // Function to toggle theme between dark and light
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Sub-component for navigation links (for DRY and styling)
  const Nav = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        // Apply different styles if the link is active
        `px-4 py-2 rounded-md text-sm transition-all duration-200 ${
          isActive
            ? "bg-brand-deep text-white" // Active link
            : "text-[#7A071A] dark:text-[#FEFCE8] hover:bg-gray-100 dark:hover:bg-gray-800"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    // Header section — sticky at the top of the page with background and border
    <header className="bg-white dark:bg-[#0b0706] sticky top-0 z-40 border-b border-gray-200 dark:border-white/5 shadow-sm">
      <div className="container-lg mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        
        {/* Left side — logo and title */}
        <div className="flex items-center gap-3">
          {/* Small emoji logo */}
          <div className="text-2xl" style={{ color: "var(--accent)" }}>
            📚
          </div>

          {/* Website title */}
          <div className="text-lg font-display font-semibold text-brand-deep dark:text-brand-beige tracking-wide">
            LibraryVault
          </div>
        </div>

        {/* Right side — navigation links and theme toggle */}
        <nav className="flex items-center gap-3">
          {/* Navigation links */}
          <Nav to="/">Home</Nav>
          <Nav to="/books">Browse Books</Nav>
          <Nav to="/add">+ Add Book</Nav>

          {/* Theme toggle button */}
          <button
            onClick={toggle}
            className="ml-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#7A071A] dark:text-[#FEFCE8] hover:scale-110 transition-transform duration-150"
          >
            {/* Screen reader text for accessibility */}
            <span className="sr-only">Toggle theme</span>

            {/* Display sun icon in dark mode, moon icon in light mode */}
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
}
