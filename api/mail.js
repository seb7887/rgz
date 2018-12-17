const nodemailer = require('nodemailer');
const config = require('./libs/config');

exports.transport = nodemailer.createTransport({
  host: config.mailHost,
  port: config.mailPort,
  secure: false,
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
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

