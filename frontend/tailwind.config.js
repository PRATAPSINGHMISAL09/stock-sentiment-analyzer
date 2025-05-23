/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#2C7A7B',
        },
        secondary: {
          light: '#FBD38D',
          DEFAULT: '#F6AD55',
          dark: '#ED8936',
        },
        positive: '#48BB78',
        negative: '#F56565',
        neutral: '#718096',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}