/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#fcb600",
        "primary-hover": "#e5a500",
        background: {
          light: "#f8f9fa",
          dark: "#000000"
        },
        card: {
          light: "#ffffff",
          dark: "#1a1a1a"
        },
        text: {
          light: "#1f2937",
          dark: "#f9fafb"
        },
        subtle: {
          light: "#6b7280",
          dark: "#9ca3af"
        },
        border: {
          light: "#e5e7eb",
          dark: "#374151"
        }
      },
      fontFamily: {
        display: ["Cairo", "sans-serif"],
        sans: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
}
