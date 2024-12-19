/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue', 'sans-serif'],
      },
      colors: {
        light: '#EAEFFF',
        dark: '#101010',
      },
    },
  },
  plugins: [],
};