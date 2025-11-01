import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for light/dark theme

// Key name used for saving theme preference in localStorage
const KEY = "lv_theme";

// ThemeToggle component — handles switching between dark and light mode
export default function ThemeToggle() {
  // Initialize theme state from localStorage or default to "light"
  const [t, setT] = useState(() => {
    try {
      return localStorage.getItem(KEY) || "light";
    } catch (e) {
      // If accessing localStorage fails (e.g., in private mode), fallback to light
      return "light";
    }
  });

  // When theme changes, update both <html> class and localStorage
  useEffect(() => {
    try {
      // Save theme to localStorage so it persists on page reload
      localStorage.setItem(KEY, t);

      // Add or remove the Tailwind "dark" class on <html>
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      // Ignore any localStorage or DOM access errors silently
    }
  }, [t]);

  return (
    // Button to toggle theme
    <button
      onClick={() => setT((x) => (x === "dark" ? "light" : "dark"))}
      className="
        p-2 rounded-full
        bg-gray-100 dark:bg-gray-800
        text-[#7A071A] dark:text-[#FEFCE8]
        transition-all duration-150 hover:scale-110
      "
      title="Toggle light/dark theme" // Tooltip on hover
    >
      {/* Display the correct icon based on current theme */}
      {t === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
