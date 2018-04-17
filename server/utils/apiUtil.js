const jwt = require('jsonwebtoken');
const mongoUtil = require('../utils').mongoUtil;
var UserModel = require('../models').UserModel;

let createUser = (data) => {
    var user = new UserModel();
    user.deserialize(data);
    return new Promise((resolve, reject) => {
        user.save()
            .then(result => {
                let payload = { subject: result.data.email };
                let token = jwt.sign(payload, 'secretKey');
                return resolve({ token });
            })
            .catch(err => {
                return reject(err)
            });
    });
};

let login = (userData) => {
    var user = new UserModel();
    return new Promise((resolve, reject) => {
        user.getUser(userData.email)
            .then(result => {
                if (!(result && result.length)) {
                    return reject("No Such User! Please check your email!");
                }

                if (!(result[0].password === userData.password)) {
                    return reject("Incorrect Password. Please try again!");
                }

                let payload = { subject: result[0].email };
                let token = jwt.sign(payload, 'secretKey');
                return resolve({ token });
            })
            .catch(err => {
                console.log(err);
                return reject(err);
            })
    });
};

module.exports = {
    createUser,
    login
}