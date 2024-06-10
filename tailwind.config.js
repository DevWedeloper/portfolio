const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        'max-lg': { max: '991px' },
        'max-md': { max: '768px' },
        'max-sm': { max: '500px' },
        'supports-hover': { raw: '(hover: hover)' },
      },
      colors: {
        'main-color': 'var(--main-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'text-color': 'var(--text-color)',
        'text-color-reverse': 'var(--text-color-reverse)',
      },
      fontSize: {
        big: 'var(--font-size-big)',
        regular: 'var(--font-size-regular)',
        tooltip: 'var(--font-size-tooltip)',
      },
      spacing: {
        'icon-adjust': 'var(--icon-size-adjust)',
        'image-width': 'var(--image-width)',
        'image-height': 'var(--image-height)',
      },
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
      },
      keyframes: {
        blink: {
          '50%': { borderColor: 'transparent' },
        },
        blob: {
          '0%': {
            borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
          },
          '50%': {
            borderRadius: '42% 61% 36% 66% / 65% 70% 28% 38%',
          },
          '100%': {
            borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
          },
        },
        fadeInLeft: {
          '0%': {
            transform: 'translateX(2rem)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        blink: 'blink 0.5s step-end infinite alternate',
        blob: 'blob 5s ease-in-out infinite',
        fadeInLeft: 'fadeInLeft 0.5s ease',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.black-and-white': {
          filter: 'var(--black-and-white)',
        },
      });
    }),
  ],
};
