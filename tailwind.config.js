/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Use 'class' mode to explicitly toggle dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        error: "var(--error)",
        borderColor: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
