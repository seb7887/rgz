const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { redisClient } = require('../redis/redisClient');
const config = require('../libs/config');

const handleSignin = (req, res, next, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      status: 400,
      message: 'Incorrect form submission'
    });
  }

  return db.select('email', 'hash').from('login')
    .where('email', '=', 'email')
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

const getAuthTokenId = (req, res, next) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({ customer_id: reply });
  })
}

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '2 days' });
}

const setToken = (token, value) => {
  return Promise.resolve(redisClient.set(token, value));
}

const createSessions = (customer) => {
  // JWT token, return customer data
  const { email, customer_id } = customer;
  const token = signToken(email);
  return setToken(token, customer_id)
    .then(() => {
      return { success: 'true', customerId: customer_id, token };
    })
    .catch(console.log);
}

exports.signInAuth = (db) => (req, res, next) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req, res, next) :
    handleSignin(req, res, next)
      .then(data => {
        return data.customer_id && data.email ? createSessions(data) : Promise.reject(data);
      })
      .then(session => res.status(200).json(session))
      .catch(err => {
        return next({
          status: 400,
          message: err
        })
      })
}