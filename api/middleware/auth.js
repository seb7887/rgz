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

const hasPermission = (id, permissions, next) => {
  db.select('*').from('customer').where('customer_id', '=', id)
    .then(customer => {
      console.log(customer[0]);
      const customerPermissions = customer[0].permissions.replace(/[{}]/g, '').split(',');
      if (customer.length) {
        const grantPermission = customerPermissions.some(permission => permissions.includes(permission));
        if (grantPermission) {
          return next();
        } else {
          return next({
            status: 400,
            message: 'Update is not allowed for you',
          });
        }
      } else {
        return next({
          status: 400,
          message: 'Error getting customer',
        });
      }
    })
    .catch(err => { 
      return next({
        status: 400,
        message: 'Unexistent customer',
      });
    })
}

const checkPermission = (req, next, permissions) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (err, reply) => {
    const id = reply;
    hasPermission(id, permissions, next);
  })
}

exports.checkPermissionUpdate = (req, res, next) => {
  const permissions = ['admin', 'itemupdate'];
  checkPermission(req, next, permissions);
}

exports.checkPermissionDelete = (req, res, next) => {
  const permissions = ['admin', 'itemdelete'];
  checkPermission(req, next, permissions);
}

exports.checkPermissionAdmin = (req, res, next) => {
  const permissions = ['admin', 'permissionupdate'];
  checkPermission(req, next, permissions);
}
