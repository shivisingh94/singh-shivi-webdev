(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController)
        .controller("NewPageController", newPageController)
        .controller("EditPageController", editPageController);


    function pageListController($routeParams, PageService) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
       // function init() {
            //var promise =
            PageService.findPageByWebsiteId(websiteId).success(function (pages) {
                vm.pages = pages;
                console.log("there are " + pages.length + "pages in this array");
                vm.websiteId=websiteId;
                vm.userId=userId;

            })
        //}
        //init();

    }

    function newPageController($routeParams, PageService, $timeout, $location) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        var pageId = $routeParams["pid"];
        vm. websiteId=websiteId;
        vm.userId=userId;
        vm.pageId=pageId;
        vm.createPage = createPage;
        function createPage(page) {
            console.log(" in createpage page.controller");
            //$timeout(function() {
                var promise = PageService.createPage(vm.websiteId,page);
                promise.success(function(newPage) {
                    console.log("in createwidget newPage" + newPage);
                    console.log("in create wisget newPage id" + newPage._id);
                    $location.url("/user/"+vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId);
                });
            //},1000);

        }
    }


    function editPageController($routeParams, PageService, $location) {
        var vm = this;
        var websiteId = $routeParams["wid"];
        var userId = $routeParams["uid"];
        var pageId = $routeParams["pid"];
        vm. websiteId=websiteId;
        vm.userId=userId;
        vm.pageId=pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
           var promise= PageService.findPageById(vm.pageId);
            promise.success(function(page) {
                vm.page = page;
                console.log("Page up in here" + vm.page.name + vm.page.description);

            })
        }
        init();


        function updatePage(page) {
           PageService.updatePage(vm.pageId, page).success(function(page) {
               // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId);
            });
        }
        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
    }


})();