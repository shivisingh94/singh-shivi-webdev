(function () {
    angular
        .module("DogGram")
        .controller("SearchListController", postListController)


    function postListController($routeParams, PostService, ExternalService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.dogSearch=dogSearch;
        vm.addAdopter=addAdopter;
        function addAdopter(userId, postId) {
            PostService.addAdopter(userId, postId);
        }

        function dogSearch(breed,size,location) {
            ExternalService.dogSearch(breed,size,location).then(function(res) {

                vm.allDogs = res.data.petfinder.pets.pet;
                console.log(" THE RES THO : "+ vm.allDogs);

            })
        }

    }


})();