/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        main: '#4A6350',
        line: '#EAFFEF',
        letterBox: '#F7F7F7',
        sub: {
          yellow: '#FFE99C',
          pink: '#FFA5C0',
          blue: '#99C3CA',
        },
        button: {
          default: '#B4D9B1',
          hover: '#9EC09B',
          press: '#5D7B64',
        },
        text: {
          white: '#FFFFFF',
          gray: '#B5B5B5',
          black: '#191919',
        },
      },
    },
  },
  plugins: [],
}

