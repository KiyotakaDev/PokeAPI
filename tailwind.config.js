/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          "dark-grey": "#202020",
          "grey": "#363636",
          "orange": "#c59732"
        }
      },
      screens: {
        "s": "370px",
        "ls": "420px",
        "1k": "1920px",
        "2k": "2560px",
        "4k": "3840px",
      }
    },
  },
  plugins: [],
}

