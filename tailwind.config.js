/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FF6363",
          700: "#FF4D4D",
        },
      },
    },
  },
  plugins: [],
}

