/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#4D6A6D', 
        'custom-grey' : '#C5C5C5',
        'txt-color' : '#4C5B61',
        'custom-grey2': '#829191'
      },
    }, 
  }, 
  plugins: [],
}
