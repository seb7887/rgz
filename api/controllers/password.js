const { randomBytes } = require('crypto');
const { promisify } = require('util');
const config = require('../libs/config');
const mail = require('../mail');

const oneHour = 3600000;

const createReset = (userId, resetToken, resetTokenExpiry, db) => {
  return db('reset_password').insert({
    customer_id: userId,
    reset_token: resetToken,
    reset_token_expires: resetTokenExpiry,
  }).returning('*');
}

// Request Password Reset
exports.requestReset = async (req, res, next, db) => {
  const { email } = req.body;
  console.log(config.mailHost);
  console.log(config.mailPort);
  try {
    // - Check if this is a real user
    const user = await db.select('*').from('customer').where({ email: email });
    console.log(user);
    if (!user.length) {
      next({
        status: 400,
        message: `No such user found for email ${email}`,
      });
    }
    // - Set a reset token and expiry on that user
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + oneHour;
    const resetRes = await createReset(user[0].customer_id, resetToken, resetTokenExpiry, db);
    // - Email them that a reset token
    const mailRes = await mail.transport.sendMail({
      from: config.mailFrom,
      to: user[0].email,
      subject: 'RGZ: Password Reset',
      html: mail.makeANiceEmail(`Your password reset token is here!
      \n\n
      <a href="${config.clientURI}/reset?resetToken=${resetToken}">Click here</a>
      `),
    });
    console.log(mailRes);
    res.status(200).json({ message: 'Thanks!' });
  } catch(err) {
    next({
      status: 400,
      message: err.message,
    });
  }
}

// Reset Password
exports.resetPassword = (req, res, next, db) => {
  // - Check if the password match
  // - Check if its a legit token
  // - Check if its expired
  res.status(200).json('hey');
}
