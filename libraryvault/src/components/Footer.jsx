// Footer component — shown at the bottom of all pages
export default function Footer() {
  return (
    // The main footer wrapper with a top margin to give spacing from the content above
    <footer className="mt-12">
      
      {/* 
        Inner container:
        - `container-lg mx-auto` centers the footer and keeps its width responsive.
        - `text-center` aligns text in the middle.
        - `py-6` adds vertical padding (top & bottom).
        - `text-sm` sets a smaller font size.
        - `text-[7A071A]` sets a custom text color (dark maroon shade).
        - `dark:text-[7A071A]` ensures the same text color in dark mode. 
      */}
      <div className="container-lg mx-auto text-center py-6 text-sm text-[7A071A] dark:text-[7A071A]">
        {/* Copyright notice */}
        © 2025 LibraryVault
      </div>
    </footer>
  );
}
