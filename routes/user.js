const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const userController = require('../controllers/user');

// /admin/add-product => GET
router.get('/', userController.getProduct);
router.get('/about', userController.getAbout);
router.get('/contact', userController.getContact);
router.get('/cart', userController.getCart);
router.get('/detail', userController.getDetail);
exports.routes = router;