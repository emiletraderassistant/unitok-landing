/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        'blue-vibrant':   '#325FEC',
        'blue-intense':   '#213FAD',
        'blue-navy':      '#11206D',
        'black-deep':     '#00002E',
        'black-midnight': '#000017',
        'turquoise':      '#80FEF0',
        'lime':           '#D7FC51',
        'gray-line':      '#DDDDDD',
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans:    ['Inter',   'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 4px 24px rgba(50,95,236,0.08)',
        'card-hover': '0 12px 40px rgba(50,95,236,0.18)',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};
