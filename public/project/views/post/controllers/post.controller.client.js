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

    function newPostController($routeParams, PostService, ExternalService, $rootScope) {
        var vm = this;
        var userId = $routeParams["uid"];
        //var postId = $routeParams["pid"];

        vm.userId=userId;
        //vm.postId=postId;
        vm.createPost = createPost;
        vm.searchImage = searchImage;
        vm.selectPhoto = selectPhoto;
        vm.getSearchUrl = getSearchUrl;
        vm.getAddUrl= getAddUrl;

        function searchImage(searchTerm) {
            ExternalService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            PostService.createPost(vm.userId,post);
            // update Post ul method here
        }
        function createPost(post) {
            if(post.url) {
                PostService.createPost(vm.userId, post);
            } else {
               // post.url = $rootScope.searchUrl;
                PostService.createPost(vm.userId, post);
            }

        }
        function getAddUrl(url) {
            vm.post.url = url;

        }
        function getSearchUrl(photo) {
           // $rootScope.searchUrl = url;
            vm.post.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";
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