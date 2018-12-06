// Create a new item
exports.createItem = (req, res, next, db) => {
  const { title, brand, model, gender, product, description, image, largeImage, price} = req.body;
  db.transaction(trx => {
    trx.insert({
      title: title,
      brand: brand,
      model: model,
      gender: gender,
      product: product,
      description: description,
      image: image,
      large_image: largeImage,
      price: price,
    })
    .into('item')
    .returning('*')
    .then(item => {
      res.status(200).json(item[0]);
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    return next({
      status: 400,
      message: 'Cannot create a new item',
    });
  })
}

// Get all items
exports.readItems = (req, res, next, db) => {
  db.select('*').from('item')
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Cannot get items',
      });
    })
}

// Get single item
exports.readItem = (req, res, next, db) => {
  const { id } = req.params;
  db.select('*').from('item').where('item_id', '=', id)
    .then(item => {
      if (item.length) {
        res.status(200).json(item[0]);
      } else {
        return next({
          status: 400,
          message: 'Item not found',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error getting item',
      })
    })
}

// Update item
exports.updateItem = (req, res, next, db) => {
  const { id } = req.params;
  const { title, brand, model, description, price} = req.body;

  db('item')
    .where({ item_id: id })
    .update({
      title: title,
      brand: brand,
      model: model,
      description: description,
      price: price,
    })
    .then(resp => {
      console.log(resp);
      if (resp) {
        res.status(200).json('success');
      } else {
        return next({
          status: 400,
          message: 'Unable to update item',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error updating item',
      });
    })
}

// Delete Item
exports.deleteItem = (req, res, next, db) => {
  const { id } = req.params;

  db('item')
    .where({ item_id: id })
    .del()
    .then(resp => {
      console.log(resp);
      if (resp) {
        res.status(200).json('success');
      } else {
        return next({
          status: 400,
          message: 'Cannot delete item',
        });
      }
    })
    .catch(err => {
      return next({
        status: 400,
        message: 'Error deleting item',
      });
    })
}