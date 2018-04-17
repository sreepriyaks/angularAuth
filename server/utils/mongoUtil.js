const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://127.0.0.1:27017/angularauth';

var db;

let connectToMongoDB = () => {
    return new Promise((resolve, reject) => {

        MongoClient.connect(mongoUrl, (err, dbInstance) => {
            if (err) {
                return reject(new Error(`Mongo Connection failed at ${mongoUrl}`));
            }
            else {
                db = dbInstance;
                return resolve(`Mongo connected at ${mongoUrl}`);
            }
        })
    });
};

let isConnected = () => {
    if (db) {
        return true;
    } else {
        return false;
    }
};

let insert = (collectionName, data) => {
    return new Promise((resolve, reject) => {
        if (isConnected()) {
            let collection = db.collection(collectionName);
            collection.insert(data, (err, res) => {
                if (err) return reject({ message: "DB Insert Failed" });
                return resolve({ message: "Data Inserted", data });
            })
        }
        else {
            return reject("Mongo not connected");
        }
    });
}

let getByQuery = (collectionName, query) => {
    return new Promise((resolve, reject) => {
        if (isConnected()) {
            let collection = db.collection(collectionName);
            collection.find(query).toArray((err, res) => {
                if (err) return reject({ message: "DB Get Failed" });
                return resolve(res);
            })
        }
        else {
            return reject("Mongo not connected");
        }
    });
}

module.exports = {
    connectToMongoDB,
    isConnected,
    insert,
    getByQuery
}