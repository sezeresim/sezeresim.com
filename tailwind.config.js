/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', ...fontFamily.sans],
        secondary: ['JetBrains Mono', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#21243D',
        },
        'light-blue': '#EDF7FA',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};
