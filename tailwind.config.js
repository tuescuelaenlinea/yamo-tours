/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yamid: {
          gold: '#C9A227',
          goldDark: '#8B7355',
          palm: '#2D5016',
          sand: '#F4E4C1',
          ocean: '#1ABC9C',
          dark: '#2C3E50',
        },
      },
    },
  },
  plugins: [],
}