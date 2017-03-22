module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server.js')();

    var userModel = mongoose.model('UserModel', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        var deferred= q.defer();
        userModel.create(user, function(err,doc) {
            if(err){
                deferred.abort();
            } else {
                deferred.resolve();
            }

        });
        return deferred.promise;
    }

    function findUserById(userId) {
        userModel
            .findById(userId, function
                (err, status) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        userModel
            .find({'username': username}, function(err, docs) {
                if(err){
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    function findUserByCredentials(username,password) {
        userModel
            .find({'username': username, 'password': password}, function(err,docs) {
                if(err){
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }
/// need Updat eand delete
    function updateUser(userId,user) {
        userModel
            .findById(userId, function (err, user) {
            user = user;
            user.save();
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if(err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


};

