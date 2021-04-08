const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const userController = require('../controllers/user');

// /admin/add-product => GET
router.get('/shop', userController.getShop);

router.get('/about', userController.getAbout);
router.get('/contact', userController.getContact);

router.get('/cart', userController.getCart);

router.get('/detail/:product_id', userController.getDetail);

router.post('/cart', userController.postCart);
exports.routes = router;