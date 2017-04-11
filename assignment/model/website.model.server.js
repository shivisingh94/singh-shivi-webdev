/**
 * Created by shivi_star on 3/21/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();
    var userSchema = require('./user.schema.server.js')();
    //
    var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
    //var userModel = mongoose.model('UserModel', userSchema);
    var userModel = require('./user.model.server').mongooseModel;

    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
        mongooseModel: websiteModel
    };
    module.exports=api;
    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        userModel
            .findById(userId, function (err, user) {
                user.websites.push(website);
                user.save();
                deferred.resolve(user);

            });

        return deferred.promise;
    }

    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        websiteModel
            .findOne({'_user': userId}, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    //Todo: how to even set up the update
    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel
            .update({_id:websiteId}, {
                $set: website
            }, function (err, status) {
                deferred.resolve(status);
            });
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        userModel.remove({_id: websiteId}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }
}

