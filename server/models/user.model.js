const mongoUtil = require('../utils/mongoUtil');

function User() {
    this.email = "",
        this.password = ""
}

User.prototype.serialize = () => {
    return {
        email: this.email,
        password: this.password
    }
};

User.prototype.deserialize = (data) => {
    this.email = data.email || this.email || "";
    this.password = data.password || this.password || "";
};

User.prototype.save = () => {
    return new Promise((resolve, reject) => {
        mongoUtil.insert('users', {
            email: this.email,
            password: this.password
        })
            .then(result => { return resolve(result); })
            .catch(err => {
                console.log(err);
                return reject(err);
            })
    });
}

User.prototype.getUser = (userEmail) => {
    return new Promise((resolve, reject) => {
        mongoUtil.getByQuery('users', { email: userEmail })
            .then(result => { return resolve(result); })
            .catch(err => {
                console.log(err);
                return reject(err);
            })
    });
}

module.exports = User;