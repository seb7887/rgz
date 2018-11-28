const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Controllers
const register = require('../controllers/register');

// Middleware
const validation = require('../middleware/validation');

router.post('/signup', validation.validateRegister, (req, res, next) => register.handleRegister(req, res, next, db));

module.exports = router;
