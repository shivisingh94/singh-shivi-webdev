(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);


    function pageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var promise = PageService.findPageByWebsiteId(websiteId);
        promise.success(function (pages) {
            vm.pages = pages;
        })
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
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
           var promise= PageService.findPageById(vm.pageId);
            promise.success(function(page) {
                vm.page = page;
                console.log("Page up in here" + vm.page.name + vm.page.description);

            })
        }


        function updatePage(page) {
            var promise = PageService.updatePage(vm.pageId, page);
            promise.success
        }
        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }


})();