const getCart = (c_id, next, db) => {
  db.select('*').from('cart_item')
    .join('item', 'cart_item.item_id', '=', 'item.item_id')
    .where('customer_id', '=', c_id)
    .then(items => {
      if (items.length) {
        return items;
      } else {
        return null;
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot get cart items',
      });
    })
}

exports.createOrder = (req, res, next, db) => {
  const { c_id } = req.params;
  //const cartItems = getCart(c_id);
  //console.log(cartItems);
  res.status(200).json('hey');
}