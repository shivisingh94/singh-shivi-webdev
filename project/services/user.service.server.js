module.exports = function(app) {//}, model) {
    app.post("/api/user/new",createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = require('../model/userproj.model.server');// model.userProjModel;

    function createUser(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        //var userId = Math.floor((Math.random() * 6) + 1);
        var user = {"username": username, "password": password, "firstName":"", "lastName":""};

        userModel.createUser(user).then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username= req.query.username;
        var password= req.query.password;
        userModel.findUserByCredentials(username,password).then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    function findUserByUsername(req, res) {
        var username = req.query.username;
       userModel
           .findUserByUsername(username)
           .then(function(user) {
               if(user) {
                   res.json(user);
               } else {
                   res.sendStatus(404).send({message: 'User not found'});

               }
           });
    }


    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(function(user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404).send({message: 'User not found'});

                }
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(userId, newUser)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });



        }


    function deleteUser(req) {
        var userId= req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        }

};
