(function(){
    angular
        .module("DogGram")
        .config(configuration);
    function configuration($routeProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                redirectTo: '/login'
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when ("/user", {
            templateUrl: "views/user/profile.view.client.html",
            controller: "ProfileController",
            controllerAs: "model",
            resolve: { loggedin: checkLoggedin }
             })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"

            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/new", {
                templateUrl: "views/post/templates/post-new.view.client.html",
                controller: "NewPostController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/:pid/comment/new", {
                templateUrl: "views/comment/templates/comment-new.view.client.html",
                controller: "NewCommentController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/:pid/comment/:cid", {
                templateUrl: "views/comment/templates/comment-edit.view.client.html",
                controller: "EditCommentController",
                controllerAs: "model"
            })
            .when("/user/:uid/post/:pid/comment", {
                templateUrl: "views/comment/templates/comment-list.view.client.html",
                controller: "CommentListController",
                controllerAs: "model"
            })

            .when("/user/:uid/post/:pid", {
                templateUrl: "views/post/templates/post-edit.view.client.html",
                controller: "EditPostController",
                controllerAs: "model"
            })

            .when("/user/:uid/post", {
                templateUrl: "views/post/templates/post-list.view.client.html",
                controller: "PostListController",
                controllerAs: "model"
            })
            .when("/user/:uid/search", {
                templateUrl: "views/search/templates/search-list.view.client.html",
                controller: "SearchListController",
                controllerAs: "model"
            })

    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/login');

            }
        });
        return deferred.promise;
    };
})();