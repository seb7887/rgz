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

const hasPermission = (id, permissions) => {
  db.select('*').from('customer').where('customer_id', '=', id)
    .then(customer => {
      console.log(customer[0]);
      if (customer.length) {
        if (permissions.some(customer[0].permissions)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    .catch(err => { return false; })
}

const checkPermission = (req, permissions) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return false;
    }
    const id = reply;
    console.log(`id ${id}`);
    if (hasPermission(id, permissions)) {
      return true;
    } else {
      return false;
    }
  });
}

exports.checkPermissionUpdate = (req, res, next) => {
  const permissions = ['admin', 'itemupdate'];
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (err, reply) => {
    const id = reply;
    console.log(`id ${id}`);
    if (hasPermission(id, permissions)) {
      return next();
    } else {
      return next({
        status: 400,
        message: 'Update is not allowed for you',
      });
    }
  })
}