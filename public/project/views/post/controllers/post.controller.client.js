(function () {
    angular
        .module("DogGram")
        .controller("PostListController", postListController)
        .controller("NewPostController", newPostController)
        .controller("EditPostController", editPostController);


    function postListController($routeParams, PostService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;

       // function init() {
            PostService.findPostByUserId(vm.userId).success(function (posts) {
                vm.posts = posts;
                console.log("there are " + posts.size + "POSTS in this array");
                vm.userId = userId;

            })

        function updatePost(post) {
            PostService.updatePost(vm.postId, post);
        }
            // })

          //  init();
       // }
    }

    function newPostController($routeParams, PostService) {
        var vm = this;
        var userId = $routeParams["uid"];
        //var postId = $routeParams["pid"];

        vm.userId=userId;
        //vm.postId=postId;
        vm.createPost = createPost;
        function createPost(post) {
               PostService.createPost(vm.userId,post);

        }
    }


    function editPostController($routeParams, PostService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var postId = $routeParams["pid"];

        vm.userId=userId;
        vm.postId=postId;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;
        function init() {
           var promise= PostService.findPostById(vm.postId);
            promise.success(function(post) {
                vm.post = post;
          //  })
          })
        }
        init();
        //

        function updatePost(post) {
           PostService.updatePost(vm.postId, post);
        }
        function deletePost() {
            PostService.deletePost(vm.postId);
        }
    }


})();