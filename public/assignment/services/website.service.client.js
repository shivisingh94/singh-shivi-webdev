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
        function createWebsite(userId, website) {
            return $http({
                method: 'POST',
                url: "/api/user/"+userId+"/website/new",
                data: {name: website.name,
                    description: website.description}
            })
        }

        function findWebsitesByUser(userId) {
            console.log("this is userid in website:" + userId);
            return $http.get("/api/user/" + userId + "/website");
        }

        function findWebsiteById(websiteId) {
          return $http.get("/api/website/"+ websiteId);
        }

        function updateWebsite(websiteId, website) {
           return $http.put("/api/website/"+ websiteId, website);
        }

        function deleteWebsite(websiteId) {
           return $http.delete("/api/website/"+ websiteId);
        }
    }
})();