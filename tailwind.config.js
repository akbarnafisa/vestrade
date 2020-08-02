const defaultTheme = require(`tailwindcss/defaultTheme`);
const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  purge: [`./components/**/*.js`, `./pages/**/*.js`],
  theme: {
    container: {
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: [`SpaceGrotesk`, ...defaultTheme.fontFamily.sans],
      },
      margin: {
        9: `2.25rem`,
      },
      padding: {
        9: `2.25rem`,
      },
      colors: {
        purple: {
          ...colors.purple,
          600: `#27178B`,
          700: `#1B105F`,
          800: `#180e4c`,
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
