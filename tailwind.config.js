/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dilis: {
          green: '#042E24',
          gold: '#C5A045',
          cream: '#FAF8ED',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
