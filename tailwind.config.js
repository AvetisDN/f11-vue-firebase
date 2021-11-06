const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Ubuntu', 'system-ui', 'sans-serif']
      },
      colors: {
        gray: colors.gray,
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        warmGray: colors.warmGray,
        rose: colors.rose,
        teal: colors.teal,
        cyan: colors.cyan,
        green: colors.green,
        emerald: colors.emerald,
        orange: colors.orange,
        indigo: colors.indigo,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
