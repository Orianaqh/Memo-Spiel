/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'green': '#eddea4'
      },
      boxShadow: {
        standard: "2px 2px 0px rgba(2, 2, 2, 1)",
      }
    },
  },
  plugins: [],
}