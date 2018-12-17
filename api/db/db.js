const knex = require('knex');
const config = require('../libs/config');

// Connect to Database
const db = knex({
  client: 'pg',
  connection: config.db,
});

module.exports = db;
