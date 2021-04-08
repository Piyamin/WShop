const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getSearchProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('admin/search', {
                pageTitle: 'Search Product',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    const product_name = '';
    const price = '';
    const product_image ='';
    const product_detail ='';
    res.render('admin/insert', {
        pageTitle: 'Insert Product',
        errorMessage: null,
        product_name: product_name,
        price: price,
        product_image : product_image,
        product_detail: product_detail
    });
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const { product_name, price,product_image,product_detail } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('admin/insert', {
            pageTitle: 'Insert Product',
            errorMessage: errors.array(),
            product_name: product_name,
            price: price,
            product_image: product_image,
            product_detail: product_detail
        });
    }

    const product = new Product(product_name, price,product_image,product_detail);
    product
        .save()
        .then(result => {
            console.log(result);
            console.log('Created Product');
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getUpdateProduct = (req, res, next) => {

    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let product_image ='';
    let product_detail ='';

    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            product_image = product.product_image;
            product_detail= product.product_detail;
            res.render('admin/update', {
                pageTitle: 'Update Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                product_image: product_image,
                product_detail: product_detail
            });
        })
        .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
    console.log(req.body);
    const { product_id, product_name, price,product_image,product_detail } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('admin/update', {
            pageTitle: 'Update Product',
            errorMessage: errors.array(),
            product_id: product_id,
            product_name: product_name,
            price: price,
            product_image: product_image,
            product_detail:product_detail
        });
    }

    const product = new Product(product_name, price,new ObjectId(product_id), product_image,product_detail);
    product
        .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/admin');
        })
        .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
    const { product_id } = req.params;
    console.log(product_id);
    Product.deleteById(product_id)
        .then(() => {
            console.log('Delete Product');
            res.redirect('/admin');
        })
        .catch(err => console.log(err));
};