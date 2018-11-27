const env = process.env.NODE_ENV;
const config = require(`./config.${env}.js`);

module.exports = config;
