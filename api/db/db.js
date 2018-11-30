const knex = require('knex');

// Connect to Database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'rgz-db'
  }
});

module.exports = db;
