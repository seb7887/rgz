const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Controllers
const register = require('../controllers/register');
const signin = require('../controllers/signin');
const customers = require('../controllers/customers');

// Middleware
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');

// Authentication
router.post('/signup', validation.validateRegister, (req, res, next) => register.handleRegister(req, res, next, db));
router.post('/signin', validation.validateSignin, signin.signInAuth(db));

// Customers
router.get('/me/:id', auth.requireAuth, (req, res, next) => customers.handleCustomer(req, res, next, db));

module.exports = router;
