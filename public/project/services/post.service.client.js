/**
 * Created by shivi_star on 4/17/2017.
 */
(function () {
    angular
        .module("DogGram")
        .factory("PostService", postService);

    function postService($http) {


        var api = {
            "createPost": createPost,
            "findPostByUserId":findPostByUserId,
            "findPostById": findPostById,
            "updatePost": updatePost,
            "deletePost": deletePost,
            "addAdopter": addAdopter
        };
        return api;
        function createPost(userId, post) {
            console.log("in create POST client server " + post.name + " " + post.caption);
            return $http({
                method: 'POST',
                url: "/api/user/" + userId +"/post/new",
                data: {name: post.name,
                    caption: post.caption,
                url: post.url}
    })

        }
        function addAdopter(userId, postId) {
            return $http({
                method: 'PUT',
                url: "/api/user/" +userId+"/post/"+postId
               // data: {post : post}
            })

        }

        function findPostByUserId(userId) {
            return $http.get("/api/user/" + userId + "/post");
        }

        function findPostById(postId) {
            return $http.get("/api/post/"+postId);
        }

        function updatePost(postId,post) {
            return $http({
                method: 'PUT',
                url: "/api/post/"+postId,
                data: {post : post}
            })
        }

        function deletePost(postId,userId) {
            return $http.delete("/api/user/"+userId+"/post/"+postId);

        }
    }
})();