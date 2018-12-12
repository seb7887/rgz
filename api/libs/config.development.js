const config = {
  jwtSecret: 'jwtsecret',
  db: 'postgres://postgres:@postgres:5432/rgz-db',
  clientURI: 'http://localhost:7777',
  redisURI: 'redis://localhost:6379',
  perPage: 2,
  stripeSecret: process.env.STRIPE_SECRET,
}

module.exports = config;
