/**
 * Created by shivi_star on 4/15/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var postSchema = require('./post.schema.server.js')();

    var postModel = mongoose.model('PostModel', postSchema);

   //var postModel = require('./post.model.server').mongooseModel;
    var userProjModel= require('./userproj.model.server').mongooseModel;
    console.log("loading var" + userProjModel);

    var api = {
        "createPost": createPost,
        "findAllPostsForUser": findAllPostsForUser,
        "findPostById": findPostById,
        "updatePost": updatePost,
        "deletePost": deletePost,
        mongooseModel: postModel
    };
    module.exports=api;
    return api;

    function createPost(userId, post) {
        var deferred = q.defer();
        postModel
            .create(post, function(err,createdpost) {
                if(err){
                    deferred.reject();
                } else {
                    userProjModel
                        .findOne({_id: userId}, function (err,user) {
                            console.log(user.posts.length);
                            user.posts.push(createdpost);
                            user.save();
                            deferred.resolve(user);
                        });
                }

            });
        console.log(userProjModel);


        return deferred.promise;
    }

    function findAllPostsForUser(userId) {
        var deferred = q.defer();
        console.log(" in find ALL POSTS FOR USER");
        postModel
            .find({'_user': userId}, function (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }

            });
        return deferred.promise;
    }

    function findPostById(postId) {
        var deferred = q.defer();

        postModel.findById(postId, function
                (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function updatePost(postId, post) {
        var deferred = q.defer();
        //delete user._id;
        postModel.update({_id: postId}, {
                $set: post
            }, function (err, status) {
                deferred.resolve(status);
            });

        return deferred.promise;

    }

    function deletePost(postId) {
        var deferred = q.defer();
        postModel
            .remove({_id: postId}, function (err, status) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }
}