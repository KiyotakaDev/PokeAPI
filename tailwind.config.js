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
          "orange": "#c59732",
          "purple": "#1a0f24"
        }
      },
      screens: {
        "s": "370px",
        "ls": "420px",
        "1k": "1920px",
        "2k": "2560px",
        "4k": "3840px",
      },
      keyframes: {
        less_bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            easing: "cubic-bezier(0.8, 0, 1, 1)"
          },
          '50%': {
            transform: "translateY(0)",
            easing: "cubic-bezier(0, 0, 0.2, 1)"
          }
        }
      },
      animation: {
        less_bounce: "less_bounce 1s infinite"
      }
    },
  },
  plugins: [],
}

