require('dotenv').config();

const config = {
  jwtSecret: process.env.SECRET_KEY,
  db: process.env.POSTGRES_URI,
  clientURI: process.env.CLIENT_URI,
  redisURI: process.env.REDIS_URI,
  perPage: 4,
  stripeSecret: process.env.STRIPE_SECRET,
  mailFrom: process.env.MAIL_FROM,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
}

module.exports = config;
