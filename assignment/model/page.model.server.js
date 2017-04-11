/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server.js')();
    //var websiteSchema = require('./website.schema.server.js')();

    var websiteModel = require('./website.model.server').mongooseModel;

    //var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

    var pageModel = mongoose.model('PageModel', pageSchema);

    var api = {
        "createPage": createPage,
        "findAllPagesForWebsite": findAllPagesForWebsite,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage,
        mongooseModel: pageModel
    };
    module.exports=api;
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
        var deferred = q.defer();
        //delete user._id;
        pageModel
            .update({_id: pageId}, {
                $set: page
            }, function (err, status) {
                deferred.resolve(status);
            });
        return deferred.promise;

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