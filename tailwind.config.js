/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-gray': {
          100: '#E9E9E9',
          200: '#B7B7B7',
          300: '#232323',
          400: '#191919',
        },
        'brand-red': '#FF494B',
      },
    },
  },
  plugins: [],
}
