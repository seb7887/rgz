const db = require('knex');
const bcrypt = require('bcryptjs');


exports.handleRegister = (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return next({
      status: 400,
      message: 'Incorrect form submission',
    });
  }

  const hash = bcrypt.hashSync(password);
  // Insert into db table
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email,
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('customer')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          permissions: '{user}',
        })
        .then(customer => {
          res.status(200).json(customer[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => {
    if (err.code === 11000) {
      err.message = 'The username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  })
}