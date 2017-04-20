/**
 * Created by shivi_star on 4/17/2017.
 */
(function () {
    angular
        .module("DogGram")
        .factory("CommentService", commentService);

    function commentService($http) {


        var api = {
            "createComment": createComment,
            "findCommentByPostId":findCommentByPostId,
            "findCommentById": findCommentById,
            "updateComment": updateComment,
            "deleteComment": deleteComment
        };
        return api;
        function createComment(postId, comment) {
            console.log("in create COMMENT client server " + comment._post + " " + comment.content);
            return $http({
                method: 'POST',
                url: "/api/post/"+ postId +"/comment/new",
                data: {content: comment.content}
            })

        }

        function findCommentByPostId(postId) {
            return $http.get("/api/post/" + postId + "/comment");
        }

        function findCommentById(commentId) {
            return $http.get("/api/comment/"+commentId);
        }

        function updateComment(commentId,comment) {
            return $http({
                method: 'PUT',
                url: "/api/comment/"+commentId,
                data: {comment : comment}
            })
        }

        function deleteComment(commentId) {
            return $http.delete("/api/comment/"+commentId);

        }
    }
})();