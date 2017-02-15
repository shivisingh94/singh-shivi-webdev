(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);


    function pageListController($routeParams, PageService) {
        var websiteId = $routeParams["0wid"];
        var pages = pageService.findPageByWebsiteId(websiteId)

        var vm = this;
        vm.pages = pages;

    }

    function newPageController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;
        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
        }
    }


    function editPageController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createPage = createPage;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }


        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
        }
        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }


})();