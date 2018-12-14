const nodemailer = require('nodemailer');
const config = require('./libs/config');

exports.transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: true,
  auth: {
    user: "6de717a6bef90a",
    pass: "d57140afeb669f",
  }
});

exports.makeANiceEmail = (text) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>😘, Seb</p>
  </div>
`;

