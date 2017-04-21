// module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var userSchema = require('./userproj.schema.server.js')();

    var userProjModel = mongoose.model('userProjModel', userSchema);

    userProjModel.createUser = createUser;
    userProjModel.findUserById = findUserById;
    userProjModel.findUserByUsername = findUserByUsername;
    userProjModel.findUserByCredentials = findUserByCredentials;
    userProjModel.updateUser = updateUser;
    userProjModel.deleteUser = deleteUser;
    module.exports = userProjModel;

    console.log("userprojmodel in userproj "+ userProjModel);
    // var api = {
    //     createUser: createUser,
    //     findUserById: findUserById,
    //     findUserByUsername: findUserByUsername,
    //     findUserByCredentials: findUserByCredentials,
    //     updateUser: updateUser,
    //     deleteUser: deleteUser,
    //     mongooseModel: userProjModel
    // };

    // module.exports = api;
    // return api;
    function createUser(user) {
        var deferred= q.defer();
        userProjModel.create(user, function(err,doc) {
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
        userProjModel
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
        userProjModel
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
        userProjModel.findOne({'username': username, 'password': password}, function(err, status) {
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
        userProjModel
            .update({_id: userId}, {
                $set: user
            }, function (err, status) {
            deferred.resolve(status);
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        userProjModel.remove({_id: userId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        return deferred.promise;
    }


// };