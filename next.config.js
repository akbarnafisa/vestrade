var path = require(`path`);

module.exports = {
  webpack(config, options) {
    config.resolve.alias[`@/`] = path.join(__dirname);
    return config;
  },
};
