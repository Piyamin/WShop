const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getShop = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('user/shop', {
                pageTitle: 'Shop',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
exports.getAbout = (req, res, next) => {
        res.render('user/about', {
                pageTitle: 'About',
        });
}
exports.getContact = (req, res, next) => {
    res.render('user/contact', {
            pageTitle: 'Contact',
    });
}
exports.getCart = (req, res, next) => {
    res.render('user/cart', {
            pageTitle: 'Cart',
    });
}

exports.postCart = (req, res, next) => {
    console.log(req.body);
    const { product_id, product_name, price,product_image,product_detail,amout } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('user/detail', {
            pageTitle: 'Detail',
            errorMessage: errors.array(),
            product_id: product_id,
            product_name: product_name,
            price: price,
            product_image: product_image,
            product_detail:product_detail,
            amout:amout
        });
    }

    const product = new Product(product_name, price, product_image,product_detail,amout,new ObjectId(product_id));
    product
        // .save()
        .then(result => {
            console.log('Update Product');
            res.redirect('/admin');
        })
        .catch(err => console.log(err));
};
exports.getAddcart = (req, res, next) => {
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
            res.render('user/cart', {
                pageTitle: 'Cart',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                product_image: product_image,
                product_detail: product_detail
            });
        })
        .catch(err => console.log(err));
    
}
exports.getDetail = (req, res, next) => {
    console.log(req.params);
    const { product_id } = req.params;
    let product_name = '';
    let price = '';
    let product_image ='';
    let product_detail ='';
    let amout = 0;
    Product.findById(product_id)
        .then(product => {
            console.log(product);
            product_name = product.product_name;
            price = product.price;
            product_image = product.product_image;
            product_detail= product.product_detail;
            amout = amout;
            res.render('user/detail', {
                pageTitle: 'detail Product',
                errorMessage: null,
                product_id: product_id,
                product_name: product_name,
                price: price,
                product_image: product_image,
                product_detail: product_detail,
                amout:amout
            });
        })
        .catch(err => console.log(err));
}

