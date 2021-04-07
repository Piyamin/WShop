const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('user/home', {
                pageTitle: 'Home',
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
exports.getDetail = (req, res, next) => {
    res.render('user/detail', {
            pageTitle: 'Detail',
    });
}
