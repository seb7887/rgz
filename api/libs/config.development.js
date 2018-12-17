const config = {
  jwtSecret: 'jwtsecret',
  db: 'postgres://postgres:postgres@postgres:5432/rgz-db',
  clientURI: 'http://localhost:7777',
  redisURI: '',
  perPage: 2,
  stripeSecret: process.env.STRIPE_SECRET,
  mailFrom: process.env.MAIL_FROM,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
}

module.exports = config;
