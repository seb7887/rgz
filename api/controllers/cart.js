// Creates a new cart item
const createCartItem = (c_id, i_id, res, next, db) => {
  db.transaction(trx => {
    trx.insert({
      item_id: i_id,
      customer_id: c_id,
    })
    .into('cart_item')
    .returning('*')
    .then(item => {
      res.status(200).json('success');
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    return next({
      status: 400,
      message: 'Cannot create a new cart item',
    });
  })
}

// Update quantity
const updateQuantity = (id, qty, res, next, db) => {
  db('cart_item')
    .where({ item_id: id})
    .update({ quantity: qty })
    .then(resp => {
      res.status(200).json('success');
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error updating cart item quantity',
      });
    })
}

// Deletes a cart item
const deleteCartItem = (i_id, res, next, db) => {
  db('cart_item')
    .where({ item_id: i_id })
    .del()
    .then(resp => {
      if (resp) {
        res.status(200).json('success');
      } else {
        return next({
          status: 400,
          message: 'Cannot delete a cart item',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error removing cart item',
      });
    })
}

// Add item to cart
exports.addToCart = (req, res, next, db) => {
  const { c_id, i_id } = req.params;
  db.select('*').from('cart_item')
    .where('customer_id', '=', c_id)
    .where('item_id', '=', i_id)
    .then(item => {
      if (item.length) {
        updateQuantity(i_id, item[0].quantity + 1, res, next, db);
      } else {
        createCartItem(c_id, i_id, res, next, db);
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot add item to the cart',
      });
    })
}

// Gets items from cart
exports.getCart = (req, res, next, db) => {
  const { c_id } = req.params;
  db.select('*').from('cart_item')
    .where('customer_id', '=', c_id)
    .then(items => {
      if (items.length) {
        res.status(200).json(items);
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot get cart items',
      });
    })
}

// Remove item from cart
exports.removeFromCart = (req, res, next, db) => {
  const { c_id, i_id } = req.params;
  db.select('*').from('cart_item')
    .where('customer_id', '=', c_id)
    .where('item_id', '=', i_id)
    .then(item => {
      if (item.length && item[0].quantity > 1) {
        updateQuantity(i_id, item[0].quantity - 1, res, next, db);
      } else if (item[0].quantity === 1) {
        deleteCartItem(i_id, res, next, db);
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot remove item from the cart',
      });
    })
}