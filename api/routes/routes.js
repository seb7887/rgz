const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Controllers
const register = require('../controllers/register');
const signin = require('../controllers/signin');
const customers = require('../controllers/customers');
const items = require('../controllers/items');

// Middleware
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');

// Authentication
router.post('/signup', validation.validateRegister, (req, res, next) => register.handleRegister(req, res, next, db));
router.post('/signin', validation.validateSignin, signin.signInAuth(db));

// Customers
router.get('/me/:id', auth.requireAuth, (req, res, next) => customers.handleCustomer(req, res, next, db));

// Items
router.post('/item', auth.requireAuth, (req, res, next) => items.createItem(req, res, next, db));
router.get('/items', (req, res, next) => items.readItems(req, res, next, db));
router.get('/item/:id', auth.requireAuth, (req, res, next) => items.readItem(req, res, next, db));
router.put('/item/:id', auth.requireAuth, auth.checkPermissionUpdate, (req, res, next) => items.updateItem(req, res, next, db));

module.exports = router;
