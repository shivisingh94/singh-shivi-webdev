(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController)
        .controller("RegisterController", registerController)
        .controller("ProfileController", profileController);

    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {

        }
        init();

        function login(user) {
            var user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }

    function registerController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createUser=createUser;

        function createUser(user) {
            UserService.createUser(user);
        }


    }

    function profileController($routeParams, UserService) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(vm.userId);

        }
        init();


        function updateUser(user) {
            UserService.updateUser(vm.userId, user);

        }
        //function deleteUser() {
        //    UserService.deleteUser(vm.userId);
        //}

    }
})();