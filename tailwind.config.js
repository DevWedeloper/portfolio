const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'max-lg': {'max': '991px'},
        'max-md': {'max': '768px'},
        'max-sm': {'max': '500px'},
      },
      colors: {
        'main-color': 'var(--main-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'text-color': 'var(--text-color)',
        'text-color-reverse': 'var(--text-color-reverse)',
      },
      fontSize: {
        'big': 'var(--font-size-big)',
        'regular': 'var(--font-size-regular)',
        'tooltip': 'var(--font-size-tooltip)',
      },
      spacing: {
        'icon-adjust': 'var(--icon-size-adjust)',
        'image-width': 'var(--image-width)',
        'image-height': 'var(--image-height)',
      },
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}