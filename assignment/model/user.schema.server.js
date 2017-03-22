module.exports = function(app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:userId", findUser);

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [Website],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'user.list'});
}


