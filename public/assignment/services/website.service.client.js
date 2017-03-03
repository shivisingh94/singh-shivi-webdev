(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", websiteService);

    function websiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
        };
        return api;
        function createWebsite(userId) {
          return $http.post("/api/user/" + userId + "/website")
        }

        function findWebsitesByUser(userId) {
            console.log("this is userid in website:" + userId);
            return $http.get("/api/user/" + userId + "/website");
        }

        function findWebsiteById(websiteId) {
          return $http.get("/api/website/"+ websiteId);
        }

        function updateWebsite(websiteId, website) {
           return $http.put("/api/website/"+ websiteId);
        }

        function deleteWebsite(websiteId) {
           return $http.delete("/api/website/"+ websiteId);
        }
    }
})();