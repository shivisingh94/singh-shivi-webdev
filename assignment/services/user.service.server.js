module.exports = function(app) {
    app.post("/api/user",createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user/:userId", findUser);
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function createUser(req,res) {
        var user = req.body;
        res.json(user);
        //if(users.includes(user)) {
        //    return false;
        //} else {
        //    users.add(user);
        //    return true;
        //}
    }

    function findUserByCredentials(req, res) {
        var username= req.query.username;
        var password= req.query.password;
        console.log("find user by credentials HTTP service");

        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        //Send http "OK"
        res.json(user);
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            findUserByCredentials(req,res);
        } else if (username) {
            findUserByUsername(req,res);
        }


    }

    function findUserByUsername(req, res) {
        var user = users.find(function(u) {
            return u.username == req.query.username;
        });
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404).send({message: 'User not found'});

        }
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function(u) {
            return u._id == userId;
        });
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for(var u in users) {
            if(users[u]._id == userId) {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                break;
            }

        }
    }

    function deleteUser(req) {
        var userId= req.params.userId;

        for(var u in users) {
            if(user[u]._id == userId) {
                users.splice(u,1);
                break;
            }
        }

    }
}
