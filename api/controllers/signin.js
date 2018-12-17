const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const redis = require('redis');
const config = require('../libs/config');

const redisClient = redis.createClient(config.redisURI);

// Checks if login data is correct and returns the customer
const handleSignin = (req, res, next, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      status: 400,
      message: 'Incorrect form submission'
    });
  }

  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('customer')
          .where('email', '=', email)
          .then(customer => customer[0])
          .catch(err => Promise.reject('Unable to get customer'))
      } else {
        return next({
          status: 400,
          message: 'Wrong credentials'
        })
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Wrong credentials'
      });
    })
}

// Gets the customer id associated with the token
const getAuthTokenId = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(`auth ${token}`);
  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return next({
        status: 400,
        message: 'Unauthorized'
      });
    }
    return res.json({ customer_id: reply });
  })
}

// Signs a new token
const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '2 days' });
}

// Store the token and customer id in Redis
const setToken = (token, value) => {
  return Promise.resolve(redisClient.set(token, value));
}

// Creates a new session
const createSessions = (customer) => {
  // JWT token, return customer data
  const { email, customer_id } = customer;
  console.log(`customer ${customer_id}`);
  const token = signToken(email);
  console.log(`token ${token}`);
  return setToken(token, customer_id)
    .then(() => {
      return { success: 'true', customerId: customer_id, token };
    })
    .catch(console.log);
}

// Handles sign in
const signInAuth = (db) => (req, res, next) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res, next) :
    handleSignin(req, res, next, db)
      .then(data => {
        return data.customer_id && data.email ? createSessions(data) : Promise.reject(data);
      })
      .then(session => res.status(200).json(session))
      .catch(err => {
        return next({
          status: 400,
          message: 'Cannot create session'
        })
      })
}

module.exports = { signInAuth, redisClient };