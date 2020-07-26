const defaultTheme = require(`tailwindcss/defaultTheme`);
const { colors } = require(`tailwindcss/defaultTheme`);

module.exports = {
  purge: [`./components/**/*.js`, `./pages/**/*.js`],
  theme: {
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
