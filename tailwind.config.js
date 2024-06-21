/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        'gray-700': '#555',
        'gray-800': '#414141',
        'gray-900': '#0f0f0f',
        'orange-500': '#ff9500',
      }
    },
  },
  plugins: [],
}
