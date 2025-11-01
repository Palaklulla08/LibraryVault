import { useEffect } from "react";

// ThemeInit component — runs once when the app loads to apply saved theme preference
export default function ThemeInit() {
  useEffect(() => {
    try {
      // Get saved theme ("light" or "dark") from localStorage
      const t = localStorage.getItem("lv_theme");

      // If theme is dark, enable Tailwind's dark mode by adding "dark" class to <html>
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } 
      // Otherwise, make sure "dark" class is removed (light mode)
      else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      // If accessing localStorage or DOM fails, just ignore it safely
    }
  }, []); // Empty dependency array — runs only once on mount

  // This component doesn't render anything on the page
  return null;
}
