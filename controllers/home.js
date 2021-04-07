const { validationResult } = require('express-validator')

const mongodb = require('mongodb');
const Product = require('../models/products');
const ObjectId = mongodb.ObjectId;

exports.getProduct = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('home/home', {
                pageTitle: 'Home',
                prods: products,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
