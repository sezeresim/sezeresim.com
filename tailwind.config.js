/** @type {import('tailwindcss').Config} */

/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};
