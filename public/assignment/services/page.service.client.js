(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService($http) {


        var api = {
            "createPage": createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
        };
        return api;
        function createPage(websiteId, page) {
            console.log("in create page client server " + page.name + " " + page.description);
            return $http({
                method: 'POST',
                url: "/api/website/"+ websiteId +"/page/new",
                data: {name: page.name,
                        description: page.description}
            })

        }

        function findPageByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }

        function findPageById(pageId) {
           return $http.get("/api/page/"+pageId);
        }

        function updatePage(pageId,page) {
            return $http({
                method: 'PUT',
                url: "/api/page/"+pageId,
                data: {page : page}
            })
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);

        }
    }
})();