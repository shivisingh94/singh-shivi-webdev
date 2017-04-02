(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
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

        function findUserById(userId) {

            return $http.get("/api/user/"+userId);
            //for(var v in users) {
            //    if(users[u]._id == userId) {
            //        return users[u];
            //    }
            //}
            //return null;
        }

        function findUserByUsername(username) {
           return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
            //for(var u in users) {
            //    if( users[u].username == username &&
            //        users[u].password == password ) {
            //        return users[u];
            //    }
            //}
            //return null;
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/"+userId);


        }
    }
})();