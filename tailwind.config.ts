/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xxs: "340px",
      // => @media (min-width: 640px) { ... }

      xs: "400px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
          lg: "2rem",
          xl: "2rem",
          "2xl": "3rem",
          "3xl": "4rem",
        },
      },
      colors: {
        "dark-navy": "#181D3C",
        "royal-blue": "#3498DB",
        "mint-green": "#2ECC71",
        "neutral-gray": "#808080",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(0.645,0.045,0.355,1)",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(16rem, 1fr))",
      },
    },
  },
  plugins: [],
};
