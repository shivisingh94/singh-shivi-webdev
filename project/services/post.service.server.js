/**
 * Created by shivi_star on 4/16/2017.
 */
module.exports = function(app, model) {

    app.post("/api/user/:userId/post/new", createPost);
    app.get("/api/user/:userId/post", findPostByUserId);
    app.get("/api/post/:postId", findPostById);
    app.put("/api/post/:postId", updatePost);
    app.delete("/api/post/:postId", deletePost);

    var postModel = model.postModel;

    function createPost(req, res) {

        var userId = req.params.userId;
        var postName= req.body.name;
        var postCaption = req.body.caption;
        var postUrl= req.body.url;
        var post = {"name": postName, "url": postUrl, "caption": postCaption,"_user":userId};

        postModel.createPost(userId,post).then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPostByUserId(req, res) {
        var userId = req.params.userId;
        console.log("find all posts :" +postModel.findAllPostsForUser(userId).type);
        postModel.findAllPostsForUser(userId).then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPostById(req, res) {
        var postId = req.params.postId;
        postModel
            .findPostById(postId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePost(req, res) {
        var postId = req.params.postId;
        var newPost = req.body.post;

        postModel
            .updatePost(postId, newPost)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }


    function deletePost(req, res) {
        var postId = req.params.postId;
        postModel
            .deletePost(postId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};
