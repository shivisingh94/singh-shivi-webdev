/**
 * Created by shivi_star on 4/17/2017.
 */
(function () {
    angular
        .module("DogGram")
        .factory("ExternalService", externalService);

    function externalService($http) {

        var key = "4663c06c5ee07ed3ce776c61bdd98ec0";
        var secret = "317e50153bd2d570";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&format=json&api_key=API_KEY&text=TEXT";

        var apiKey= "4f1fe17c0a7e0addda19d8d12d8c0185";
        var api={
            "dogSearch": dogSearch,
            "searchPhotos" : searchPhotos
        };
        return api;
        //
        //var flickr = new Flickr({
        //    api_key: " "
        //})
        //
        //function imageSearch (text) {
        //    flickr.photos.search({
        //        text: text
        //    }function(err, result) {
        //        if(err) { throw new Error(err); }
        //        else {
        //            return result;
        //        }
        //
        //    }




        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function dogSearch(breed, size, location) {
            var apiUrl="http://api.petfinder.com/pet.find?format=json&alt=json&key=" + apiKey +
                "&animal=dog&breed=" + breed + "&size=" + size + "&location=" + location;
           console.log(apiUrl);
            return $http.get(apiUrl);
        }


    }
})();


