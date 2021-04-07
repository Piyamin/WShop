const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    // MongoClient.connect('mongodb://admin:password@localhost:27017/db', function (err, db)
    //version 1.11 earlier
    MongoClient.connect("mongodb://piyamin:23102542Miw@cluster0-shard-00-00.wbf0i.mongodb.net:27017,cluster0-shard-00-01.wbf0i.mongodb.net:27017,cluster0-shard-00-02.wbf0i.mongodb.net:27017/Shop?replicaSet=atlas-v8u9qs-shard-0&ssl=true&authSource=admin")
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;