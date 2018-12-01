const redis = require('redis');
//const config = require('../libs/config');

// Setup Redis
const redisClient = redis.createClient({
  port: 6379,
  host: '120.0.0.1',
  password: ''
});

module.exports = redisClient;