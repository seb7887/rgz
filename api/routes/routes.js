const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Controllers
const register = require('../controllers/register');
const signin = require('../controllers/signin');
const customers = require('../controllers/customers');
const password = require('../controllers/password');
const items = require('../controllers/items');
const cart = require('../controllers/cart');
const orders = require('../controllers/orders');

// Middleware
const validation = require('../middleware/validation');
const auth = require('../middleware/auth');

// Authentication
router.post('/signup', validation.validateRegister, (req, res, next) => register.handleRegister(req, res, next, db));
router.post('/signin', validation.validateSignin, signin.signInAuth(db));

// Customers
router.get('/me', auth.requireAuth, (req, res, next) => customers.handleCurrentCustomer(req, res, next, db));
router.get('/me/:id', auth.requireAuth, (req, res, next) => customers.handleCustomer(req, res, next, db));
router.get('/customers', auth.requireAuth, (req, res, next) => customers.handleCustomers(req, res, next, db));
router.put('/customers/:id', auth.requireAuth, auth.checkPermissionAdmin, (req, res, next) => customers.updatePermission(req, res, next, db));

// Password Reset
router.post('/recover', (req, res, next) => password.requestReset(req, res, next, db));

// Items
router.post('/item', auth.requireAuth, (req, res, next) => items.createItem(req, res, next, db));
router.get('/items', (req, res, next) => items.readItems(req, res, next, db));
router.get('/items/total', (req, res, next) => items.totalItems(req, res, next, db));
router.get('/items/:page', (req, res, next) => items.readPage(req, res, next, db));
router.get('/item/:id', (req, res, next) => items.readItem(req, res, next, db));
router.get('/search?', (req, res, next) => items.searchItems(req, res, next, db));
router.put('/item/:id', auth.requireAuth, auth.checkPermissionUpdate, (req, res, next) => items.updateItem(req, res, next, db));
router.delete('/item/:id', auth.requireAuth, auth.checkPermissionDelete, (req, res, next) => items.deleteItem(req, res, next, db));

// Cart Items
router.post('/cart/:c_id/:i_id', auth.requireAuth, (req, res, next) => cart.addToCart(req, res, next, db));
router.get('/cart/:c_id', auth.requireAuth, (req, res, next) => cart.getCart(req, res, next, db));
router.delete('/cart/:c_id/:i_id', auth.requireAuth, (req, res, next) => cart.removeFromCart(req, res, next, db));
router.delete('/cart/:c_id', auth.requireAuth, (req, res, next) => cart.emptyCart(req, res, next, db));
router.get('/cart/:c_id/total', auth.requireAuth, (req, res, next) => cart.totalItems(req, res, next, db));

// Orders
router.post('/orders/:c_id', auth.requireAuth, (req, res, next) => orders.createOrder(req, res, next, db));
router.get('/orders/:c_id', auth.requireAuth, (req, res, next) => orders.readOrders(req, res, next, db));

module.exports = router;
