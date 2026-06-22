/** @type {import('tailwindcss').Config} */
module.exports = {
  // Paths to all templates in the project
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      // Customise colours or fonts here
      colors: {
        primary: {
          DEFAULT: '#0d47a1',
          light: '#5472d3',
          dark: '#002171'
        },
        secondary: {
          DEFAULT: '#c51162'
        }
      }
    }
  },
  plugins: []
};