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
            console.log("in login");
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise.success(function (user) {
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "User not found";
                }
            });
        }
    }

    function registerController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createUser = createUser;

       // vm.register = register;
        //
        //function register(user) {
        //    UserService.findUserByUsername(user.username)
        //                .success(function(user) {
        //                    vm.message = "That username is already taken";
        //                })
        //                .error(function(err) {
        //                    vm.message = "Username available"
        //                })
        //}

        function createUser(user) {

            UserService.createUser(user);
            $location.url("#/login");


            //UserService.findUserByUsername(user.username)
            //    .success(function (err) {
            //        vm.message = "That username is already taken";
            //    })
            //    .error(function (user) {
            //        vm.message = "Username available";
            //        UserService.createUser(user);
            //        $location.url("#/login");
            //
            //    })

            //   var promise =  UserService.createUser(user);
            //    promise.success(function(user){
            //        vm.user = user;
            //        })
            //}


        }
    }

    function profileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var userId = $routeParams["uid"];
        vm._id=userId;
        console.log(userId);
        function init() {
            var promise = UserService.findUserById(vm._id);
            console.log("Promise up in here" + promise);
            promise.success(function(user){
                vm.user = user;
                console.log("User up in here" + vm.user.username + vm.user.lastName +vm._id);
            })
        }
        init();


        function updateUser(newUser) {
            UserService.updateUser(vm._id, newUser)
                .success(function (newUser) {
                    if(newUser != null){
                        vm.message = "User Successfully updated!"
                    } else {
                        vm.error ="Unable to update user"
                    }
                });
        }
    }
})();