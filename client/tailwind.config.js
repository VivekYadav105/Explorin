/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        main:"var(--main)",
        "main-dark":"var(--main-dark)",
        blue:"var(--blue)",
        cyan:'var(--cyan)',
        grey:'var(--gray)'
      }
    },
  },
  plugins: [],
}

