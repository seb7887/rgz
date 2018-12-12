const config = require('./libs/config');

module.exports = require('stripe')(config.stripeSecret);
