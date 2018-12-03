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
