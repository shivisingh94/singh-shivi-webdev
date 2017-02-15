(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("EditWebsiteController", editWebsiteController);

    function websiteListController($routeParams, UserService) {

        var userId = $routeParams["uid"];
        var websites = websiteService.findAllWebsites(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;


    }

    function newWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId= $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website)
        }

    }
    function editWebsiteController($routeParams, WebsiteService) {

        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId= $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsit(vm.websiteId, website);

        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();