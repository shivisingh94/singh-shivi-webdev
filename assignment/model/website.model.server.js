/**
 * Created by shivi_star on 3/21/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server.js')();
    var userSchema = require('./user.schema.server.js')();

    var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
    var userModel = mongoose.model('UserModel', userSchema);
    var api = {
        "createWebsiteForUser": createWebsiteForUser,
        "findAllWebsitesForUser": findAllWebsitesForUser,
        "findWebsiteById": findWebsiteById,
        "updateWebsite": updateWebsite,
        "deleteWebsite": deleteWebsite,
    };
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
            .find({'_user': userId}, function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        websiteModel
            .findById(websiteId, function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    //Todo: how to even set up the update
    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        websiteModel
            .update(websiteId, function (err) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        userModel.remove({_id: websiteId}, function (err, status) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }
}

