/**
 * Created by shivi_star on 4/16/2017.
 */
module.exports = function(app) {//, model) {

    app.post("/api/post/:postId/comment/new", createComment);
    app.get("/api/post/:postId/comment", findCommentByPostId);
    app.get("/api/comment/:commentId", findCommentById);
    app.put("/api/comment/:commentId", updateComment);
    app.delete("/api/comment/:commentId", deleteComment);

    var commentModel = require('../model/comment.model.server');// model.commentModel;

    function createComment(req, res) {
        var postId = req.params.postId;
        var postComment= req.body.content;
        var comment = {"_post":postId, "content": postComment};

        commentModel.createComment(postId,comment).then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findCommentByPostId(req, res) {
        var postId = req.params.postId;
        commentModel
            .findAllCommentsForPost(postId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findCommentById(req, res) {
        var commentId = req.params.commentId;
       commentModel
            .findCommentById(commentId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateComment(req, res) {
        var commentId = req.params.commentId;
        var newComment= req.body.comment;

        commentModel
            .updateComment(commentId, newComment)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }


    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        commentModel
            .deleteComment(commentId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};
