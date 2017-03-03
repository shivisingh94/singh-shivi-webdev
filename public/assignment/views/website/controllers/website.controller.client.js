(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController)
        .controller("NewWebsiteController", newWebsiteController)
        .controller("EditWebsiteController", editWebsiteController);

    function websiteListController($routeParams, WebsiteService) {

        console.log("are we in websitelistcontroller");
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        console.log("this is the user id : " + userId);
        function init()
        {

            console.log("In the websitelistcontroller init");
            var promise = WebsiteService.findWebsitesByUser(userId);
            //console.log("websites tho "+ websites[1]);
            console.log("websitelistPromise up in here" + promise);
            promise.success(function(websites){
                vm.websites = websites;
            })
        };

        init();


    }

    function newWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId= $routeParams["wid"];
        vm.createWebsite = createWebsite;

        function createWebsite(website) {
            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise.success = (function (website) {
                vm.website = website;

            })
        }

    }
    function editWebsiteController($routeParams, WebsiteService) {

        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId= $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        //vm.findWebsitesByUser = findWebsitesByUser;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success (function(websites) {
                vm.websites = websites;
            })
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);

        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();