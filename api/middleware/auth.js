const { redisClient } = require('../controllers/signin');

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