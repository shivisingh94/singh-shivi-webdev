module.exports = function(app) {

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        picture: String,
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'userProjModel'}],
       // websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'postModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'userproj.list'});

    return UserSchema;
}


