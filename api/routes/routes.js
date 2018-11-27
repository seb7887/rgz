const express = require('express');
const router = express.Router();

// Controllers
const register = require('../controllers/register');

router.post('/signup', register.handleRegister);

module.exports = router;
