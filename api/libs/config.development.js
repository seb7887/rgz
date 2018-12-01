const config = {
  jwtSecret: 'jwtsecret',
  db: 'postgres://postgres:@postgres:5432/rgz-db',
  clientURI: 'http://localhost:7777',
  redisURI: 'redis://localhost:6379'
}

module.exports = config;
