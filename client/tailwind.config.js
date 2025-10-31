/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'saffron': '#F4B400',
        'india-green': '#138808',
        'india-blue': '#000080',
        'light-bg': '#f7f9fc',
        'dark-text': '#333333',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
