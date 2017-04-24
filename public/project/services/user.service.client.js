(function () {
    angular
        .module("DogGram")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "login": login,
            "logout": logout,
            "loggedin": loggedin,
            "register": register
    };
        return api;
        function createUser(user) {
            return $http({
                method: 'POST',
                url: "/api/user/new",
                data: {
                    username: user.username,
                    password: user.password
                }
            })
        }

        function register(user) {
            return $http.post("/api/register", user);
        }
        function login(user) {
            return $http.post("/api/login", user);
        }
        function loggedin(user) {
            return $http.get("/api/loggedin", user);
        }
        function logout(user) {
            return $http.post("/api/logout");
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
           return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);


        }
    }
})();