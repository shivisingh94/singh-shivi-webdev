/**
 * Created by shivi_star on 4/17/2017.
 */
(function () {
    angular
        .module("DogGram")
        .factory("ExternalService", externalService);

    function externalService($http) {

        var apiKey="4f1fe17c0a7e0addda19d8d12d8c0185";
        var api={
            "dogSearch": dogSearch
            //"findCommentByPostId":findCommentByPostId,
            //"findCommentById": findCommentById,
            //"updateComment": updateComment,
            //"deleteComment": deleteComment
        };
        return api;

        function dogSearch(breed, size, location) {
            return $http.get("http://api.petfinder.com/pet.find?format=json&alt=json&key=" + apiKey +
                "&animal=dog&breed=" + breed + "&size=" + size + "&location=" + location);
        }


    }
})();


