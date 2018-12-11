const { redisClient } = require('../controllers/signin');

const getCustomer = (id, res, next, db) => {
  db.select('*').from('customer').where('customer_id', '=', id)
    .then(customer => {
      if (customer.length) {
        res.status(200).json(customer[0]);
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

// Gets current customer
exports.handleCurrentCustomer = (req, res, next, db) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (err, reply) => {
    const id = reply;
    if (err || !reply) {
      return next({
        status: 401,
        message: 'User undefined',
      });
    }
    getCustomer(id, res, next, db);
  })
}

// Gets a customer by id
exports.handleCustomer = (req, res, next, db) => {
  const { id } = req.params;
  db.select('*').from('customer').where('customer_id', '=', id)
    .then(customer => {
      if (customer.length) {
        res.status(200).json(customer[0]);
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

// Gets all customers
exports.handleCustomers = (req, res, next, db) => {
  db.select('*').from('customer')
    .then(customers => {
      if (customers.length) {
        res.status(200).json(customers);
      } else {
        return next({
          status: 400,
          message: 'Cannot get customers',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error getting customers',
      });
    })
}

// Updates permissions
exports.updatePermission = (req, res, next, db) => {
  const { id } = req.params;
  const { permissions } = req.body;

  db('customer')
    .where({ customer_id: id })
    .update({
      permissions: permissions,
    })
    .then(resp => {
      if (resp) {
        res.status(200).json('success');
      } else {
        return next({
          status: 400,
          message: 'Unable to update permissions',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot update permissions',
      });
    })
}