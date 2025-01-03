/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#AE1438",
        "secondary-color": "#A2D64A"
      },
      animation: {
        // Custom animations for infinite scrolling
        "scroll-left": "scroll-left 15s linear infinite",
        "scroll-right": "scroll-right 15s linear infinite",
      },
      keyframes: {
        // Keyframes to define the scroll animation
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
}
