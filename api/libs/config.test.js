const config = {
  jwtSecret: 'jwtsecret',
  db: 'postgres://postgres:@postgres:5432/rgz-db',
  clientURI: 'http://localhost:7777',
  redisURI: '',
  perPage: 2,
}

module.exports = config;
