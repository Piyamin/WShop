const express = require('express');

const { check } = require('express-validator')
const router = express.Router();

const adminController = require('../controllers/admin');

// /admin/add-product => GET
router.get('/admin', adminController.getSearchProduct);

router.get('/insert', adminController.getAddProduct);

router.get('/update/:product_id', adminController.getUpdateProduct);

// /admin/add-product => POST
router.post('/insert', [
    check('product_name').trim().not().isEmpty().withMessage("product name is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero"),
    check('product_image').trim().not().isEmpty().withMessage("product image is required"),
    check('product_detail').trim().not().isEmpty().withMessage("product detail is required")
], adminController.postAddProduct);

router.post('/update', [
    check('product_id').not().isEmpty().withMessage("empty"),
    check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
    check('product_image').trim().isLength({ min: 1 }).withMessage("product image is required"),
    check('product_detail').trim().isLength({ min: 1 }).withMessage("product detail is required"),
    check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
], adminController.postUpdateProduct);

router.get('/delete/:product_id', adminController.getDeleteProduct);

exports.routes = router;