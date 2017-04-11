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
        deleteUser: deleteUser,
        mongooseModel: userModel
    };

    module.exports = api;
    return api;
    function createUser(user) {
        var deferred= q.defer();
        userModel.create(user, function(err,doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve();
            }

        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred= q.defer();
        userModel
            .findById(userId, function
                (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred= q.defer();
        userModel
            .find({'username': username}, function(err, status) {
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function findUserByCredentials(username,password) {
        var deferred= q.defer();
        userModel.findOne({'username': username, 'password': password}, function(err, status) {
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }
/// need Update and delete
    function updateUser(userId,user) {
        var deferred = q.defer();
        //delete user._id;
        userModel
            .update({_id: userId}, {
                $set: user
            }, function (err, status) {
            deferred.resolve(status);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userModel.remove({_id: userId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


};