const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Controllers
const register = require('../controllers/register');
const signin = require('../controllers/signin');

// Middleware
const validation = require('../middleware/validation');

router.post('/signup', validation.validateRegister, (req, res, next) => register.handleRegister(req, res, next, db));
router.post('/signin', signin.signInAuth(db));

module.exports = router;
