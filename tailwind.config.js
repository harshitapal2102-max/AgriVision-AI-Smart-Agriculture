/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d', // primary forest green
        },
        sage: {
          100: '#eef2ee',
          200: '#dce4dc',
          500: '#8ca38c', // sage backgrounds
        },
        alabaster: '#f9faf8', // background
        harvest: {
          400: '#fbbf24',
          500: '#f59e0b', // harvest gold accents
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
