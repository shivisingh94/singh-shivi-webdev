(function () {
    angular
        .module("DogGram")
        .controller("PostListController", postListController)
        .controller("NewPostController", newPostController)
        .controller("EditPostController", editPostController);

    function postListController($routeParams, PostService, ExternalService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.addAdopter=addAdopter;
        vm.dogSearch=dogSearch;
        function addAdopter(userId, postId) {
            PostService.addAdopter(userId, postId);
        }

        function dogSearch(breed,size,location) {
            ExternalService.dogSearch(breed,size,location).then(function(res) {

                vm.allDogs = res.data.petfinder.pets.pet;
                console.log(" THE RES THO : "+ vm.allDogs);

            })
        }

       // function init() {
            PostService.findPostByUserId(vm.userId).success(function (posts) {
                vm.posts = posts;
                console.log("there are " + posts.size + "POSTS in this array");
                vm.userId = userId;

            })


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
            PostService.deletePost(vm.postId, vm.userId);
        }
    }


})();