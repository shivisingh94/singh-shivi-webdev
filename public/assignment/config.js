(function(){
    angular
        .module("WebAppMaker")
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
            //.when("/register", {
            //    templateUrl: "views/user/templates/register.view.client.html",
            //    controller: "RegisterController",
            //    controllerAs: "model"
            //})
            .when("/user/:uid/website", {
                templateUrl: "views/website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
            templateUrl: "views/website/templates/website-edit.view.client.html",
            controller: "EditWebsiteController",
            controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            });
            //.when("/website", {
            //    templateUrl: "views/website/templates/website-list.view.client.html",
            //    controller: "WebsiteListController",
            //    controllerAs: "model"
            //});

        // $locationProvider.html5Mode(true);
    }
})();