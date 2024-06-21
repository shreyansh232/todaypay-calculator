/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'gray-700': '#555',
        'gray-800': '#414141',
        'gray-900': '#0f0f0f',
        'orange-500': '#ff9500',
        'gray-600': '#73736d',
      }
    },
  },
  plugins: [],
}

