/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        projects: {
          css: {
            h1: {
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
            },
            h2: {
              marginTop: '4rem',
              marginBottom: '1.25rem',
              fontSize: '1.375rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            },
            h3: {
              marginTop: '3rem',
              marginBottom: '0.75rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            },
            h4: {
              marginTop: '2.5rem',
              marginBottom: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            },
            h5: {
              marginTop: '2rem',
              marginBottom: '0.5rem',
              fontSize: '1.0625rem',
              fontWeight: '500',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            },
            h6: {
              marginTop: '1.5rem',
              marginBottom: '0.25rem',
              fontSize: '1.025rem',
              fontWeight: '400',
              letterSpacing: '0em',
              textTransform: 'uppercase',
            },
          },
        },
      }),
    },
  },
};
