const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Products {
    constructor(product_name, price,product_image,product_detail,id) {
        this.product_name = product_name;
        this.price = price;
        this._id = id;
        this.product_image = product_image;
        this.product_detail= product_detail;
    }

    save() {
        const db = getDb();
        
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('products')
                .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            // Insert product
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('products')
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log('Deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = Products;