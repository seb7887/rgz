const { redisClient } = require('../controllers/signin');
const db = require('../db/db');

exports.requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  }

  const token = authorization.split(' ')[1];
  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return next({
        status: 401,
        message: 'Unauthorized',
      });
    }
    return next();
  });
}

exports.checkPermissionUpdate = (req, res, next) => {
  const permissions = ['admin', 'itemupdate'];
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (err, reply) => {
    const id = reply;
    db.select('*').from('customer').where('customer_id', '=', id)
    .then(customer => {
      if (customer.length) {
        if (permissions.includes(customer[0].permissions)) {
          return next();
        } else {
          return next({
            status: 400,
            message: 'Not permitted',
          })
        }
      } else {
        return next({
          status: 400,
          message: 'Not found',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error getting customer',
      });
    })
  }
}