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

const tokenIsValid = (resetToken, db) => {
  return db.select('*').from('reset_password')
    .where({ reset_token: resetToken })
    .andWhere('reset_token_expires', '>', Date.now() - oneHour);
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
exports.resetPassword = async (req, res, next, db) => {
  const { resetToken } = req.query;
  const { password } = req.body;
  console.log(resetToken);
  try {
  // - Check if its a legit token
  // - Check if its expired
    const token = await tokenIsValid(resetToken, db);
    console.log(token[0]);
    if(!token.length) {
      next({
        status: 400,
        message: 'Invalid reset token',
      });
    }
    res.status(200).json('hey');
  } catch(err) {
    next({
      status: 400,
      message: 'Error resetting password',
    });
  }
}
