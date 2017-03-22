/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server.js')();

    var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
    var pageModel = mongoose.model('PagerModel', pageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
    };
    return api;

    function createPage(websiteId, page) {
        var deferred = q.defer();
        pageModel
            .create(page, function(err,doc) {
                if(err){
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        websiteModel
            .findById(websiteId, function (err, website) {
                website.pages.push(page);
                website.save();
                deferred.resolve(website);

            });

        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel
            .find({'_website': websiteId}, function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    function findPageById(pageId) {
        var deferred = q.defer();

        pageModel
            .findById(pageId,function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
    ////

    }

    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel
            .remove({_id: pageId}, function (err, status) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }
}