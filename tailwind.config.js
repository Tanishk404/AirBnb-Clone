/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./Frontend/views/**/*.{ejs, html}",
    "./Frontend/public/**/*.{js, html}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'top': '0 -4px 6px rgba(0,0,0,0.1)',
        'bottom': '0 4px 6px rgba(0,0,0,0.1)',
        'left': '-4px 0 6px rgba(0,0,0,0.1)',
        'right': '4px 0 6px rgba(0,0,0,0.1)',
        'all-sides': '0 -4px 6px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.1), -4px 0 6px rgba(0,0,0,0.1), 4px 0 6px rgba(0,0,0,0.1)',
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },


  },
  plugins: [],
}

