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