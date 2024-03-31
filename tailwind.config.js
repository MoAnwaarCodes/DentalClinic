/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}"
  ],
  backgroundImage: {
    'hero-pattern': "url('/img/hero-pattern.svg')",
    'footer-texture': "url('/img/footer-texture.png')",
  },
  theme: {
    extend: {},
  },
  plugins: [],
}