/**
 * Created by shivi_star on 4/15/2017.
 */
// module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var commentSchema = require('./comment.schema.server.js')();
    var commentModel = mongoose.model('CommentModel', commentSchema);

    var postModel = require('./post.model.server');

    commentModel.createComment = createComment;
    commentModel.findAllCommentsForPost = findAllCommentsForPost;
    commentModel.findCommentById = findCommentById;
    commentModel.updateComment = updateComment;
    commentModel.deleteComment = deleteComment;
    module.exports = commentModel;

    console.log("loading post in comment var" + postModel);
    // var api = {
    //     "createComment": createComment,
    //     "findAllCommentsForPost": findAllCommentsForPost,
    //     "findCommentById": findCommentById,
    //     "updateComment": updateComment,
    //     "deleteComment": deleteComment,
    //     mongooseModel: commentModel
    // };
    // module.exports=api;
    // return api;

    function createComment(postId, comment) {
        var deferred = q.defer();
        commentModel
            .create(comment, function(err,createdcomment) {
                if(err){
                    deferred.reject();
                } else {
                   postModel
                        .findOne({_id: postId}, function (err,post) {
                           if (err) {
                               deferred.reject(err);
                           } else {

                               console.log(post.comments.length);
                               post.comments.push(createdcomment);
                               post.save();
                               deferred.resolve(post);
                           }
                        });
                }

            });

        return deferred.promise;
    }

    function findAllCommentsForPost(postId) {
        var deferred = q.defer();
        commentModel
            .find({'_post': postId}, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }

    function findCommentById(commentId) {
        var deferred = q.defer();
        commentModel.findById(commentId, function
            (err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }

    function updateComment(commentId, comment) {
        var deferred = q.defer();
        //delete user._id;
        commentModel
            .update({_id: commentId}, {
                $set: comment
            }, function (err, status) {
                deferred.resolve(status);
            });
        return deferred.promise;

    }

    function deleteComment(commentId) {
        var deferred = q.defer();
        commentModel
            .remove({_id: commentId}, function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }

            });
        return deferred.promise;
    }
// }