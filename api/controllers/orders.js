const stripe = require('../stripe');

const getCart = (c_id, db) => {
  return db.select('*').from('cart_item')
    .join('item', 'cart_item.item_id', '=', 'item.item_id')
    .where('customer_id', '=', c_id);
}

const emptyCart = (c_id, res, next, db) => {
  db('cart_item')
    .where({ customer_id: c_id })
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

const createOrderItem = (item, db) => {
  return db('order_item').insert({
      title: item.title,
      brand: item.brand,
      model: item.model,
      gender: item.gender,
      product: item.product,
      description: item.description,
      image: item.image,
      large_image: item.large_image,
      price: item.price,
      quantity: item.quantity,
      order_id: 1,
    })
    .returning('*')
    .then(res => res);
}

const updateOrderItem = (item, orderId, db) => {
  console.log(`oi_id: ${item[0].order_item_id}`);
  console.log(`orderId: ${orderId}`);
  
  return db('order_item')
    .where({ order_item_id: item[0].order_item_id })
    .update({ order_id: orderId })
    .then(res => res);
}

const createOrder = (id, total, charge, db) => {
  return db('sale_order').insert({
    customer_id: id,
    total: total,
    charge: charge,
  }).returning('*');
}

const getOrders = async (c_id, res, next, db) => {
  try {
    const reqOrders = await db.select('*').from('sale_order').where({ customer_id: c_id });
    if (!reqOrders.length) {
      res.status(200).json('No orders');
    } else {
      const orders = await Promise.all(reqOrders.map(async (ord) => {
        const items = await db.select('*').from('order_item').where({ order_id: ord.order_id });
        const order = {
          order_id: ord.order_id,
          customer_id: ord.customer_id,
          total: ord.total,
          charge: ord.charge,
          items: items,
        };
        return order;
      }));
      res.status(200).json(orders);
    }
  } catch(err) {
    next({
      status: 400,
      message: 'Cannot get orders',
    });
  }
}

exports.createOrder = async (req, res, next, db) => {
  try {
    const { c_id, token } = req.params;
    // - Get the current customer's cart
    const cartItems = await getCart(c_id, db);
    // - Recalculate the total for the price
    const amount = cartItems.reduce((tally, item) => tally + item.price * item.quantity, 0);
    // - Stripe here
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: token,
    })
    // - Convert the cart items to order items
    // Because Array.prototype.map returns a new array of Promises, you need to wrap it
    // with Promise.all
    const orderItems = await Promise.all(cartItems.map(async (item) => {
       const orderItem = await createOrderItem(item, db);
       return orderItem;
    }));
    console.log(orderItems);
    // - Create order
    const order = await createOrder(c_id, amount, charge, db);
    const orderId = order[0].order_id;
    console.log(orderId);
    // - Update order items with order id
    const linkedItems = await Promise.all(orderItems.map(async (item) => {
      const updatedItem = await updateOrderItem(item, orderId, db);
      return updatedItem;
    }));
    // - Clear all cart items and respond
    emptyCart(c_id, res, next, db);
  } catch(err) {
    next({
      status: 400,
      message: 'Error creating a new order',
    });
  }
}

exports.readOrders =  (req, res, next, db) => {
  const { c_id } = req.params;
  getOrders(c_id, res, next, db);
}