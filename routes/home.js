const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const homeController = require('../controllers/home');

// /admin/add-product => GET
router.get('/', homeController.getProduct);

exports.routes = router;