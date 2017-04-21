(function(){
    angular
        .module("DogGram")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: '/login'
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
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

            .when("/user/:uid/post/:pid/comment/:cid", {
                templateUrl: "views/comment/templates/comment-edit.view.client.html",
                controller: "EditCommentController",
                controllerAs: "model"
            })
            //.when("/user/:uid/post/:pid/comment/:cid/widget", {
            //    templateUrl: "views/widget/templates/widget-list.view.client.html",
            //    controller: "WidgetListController",
            //    controllerAs: "model"
            //})
            //
            //.when("/user/:uid/website/:wid/page/:pid/widget/new", {
            //    templateUrl: "views/widget/templates/widget-chooser.view.client.html",
            //    controller: "NewWidgetController",
            //    controllerAs: "model"
            //})
            //
            //.when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
            //    templateUrl: "views/widget/templates/widget-edit.view.client.html",
            //    controller: "EditWidgetController",
            //    controllerAs: "model"
            //})
        ;
            //.when("/website", {
            //    templateUrl: "views/website/templates/website-list.view.client.html",
            //    controller: "WebsiteListController",
            //    controllerAs: "model"
            //});

        // $locationProvider.html5Mode(true);
    }
})();