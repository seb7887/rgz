const bcrypt = require('bcryptjs');


exports.handleRegister = (req, res, next, db) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return next({
      status: 400,
      message: 'Incorrect form submission',
    });
  }

  // Hash the password.
  const hash = bcrypt.hashSync(password);
  
  // Insert into db table.
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
          name: name,
          email: loginEmail[0],
          permissions: '{user}',
        })
        .then(customer => {
          res.status(200).json({ customer: customer[0], token: hash });
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