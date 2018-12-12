require('dotenv').config();

const config = {
  jwtSecret: process.env.SECRET_KEY,
  db: 'postgres://postgres:@postgres:5432/rgz-db',
  clientURI: process.env.CLIENT_URI,
  redisURI: process.env.REDIS_URI,
  perPage: 4,
  stripeSecret: process.env.STRIPE_SECRET,
}

module.exports = config;
