module.exports = function(app) {//}, model) {
    var model = require('../model/userproj.model.server')();
    var passport = require('passport');
    var bcrypt = require("bcrypt-nodejs");
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || '1901160933454415',
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || 'a140552896b48abbfd7b6bd7fbc58bbd',
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL  || '/auth/facebook/callback'
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    app.post("/api/user/new",createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.get("/api/loggedin", loggedin);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get ("/auth/facebook", passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));
    var userModel = require('../model/userproj.model.server');// model.userProjModel;

    function login(req, res) {
        console.log("in LOGIN")
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
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
    function register (req, res) {
        var user = req.body;
        user.username = user.username.toLocaleLowerCase();
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user).then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
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


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username.toLocaleLowerCase())
            .then(
            function(user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
    }
    function serializeUser(user, done) {
        return done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
            function(user){
                return done(null, user);
            },
            function(err){
                return done(err, null);
            }
        );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                if (!user) {
                    var newUser = {
                        username: profile.displayName.toLocaleLowerCase().replace(/\s+/g, '_'),
                        password: profile.id.toString(),
                        firstName: profile.displayName,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    model
                        .createUser(newUser)
                        .then(
                        function (user) {
                            return done(null, user);
                        },
                        function (error) {
                            return done(error, null);
                        });
                } else {
                    return done(null, user);
                }
            },
            function(err) {
                if(err) {
                    return done(err);
                }
            });
    }

};
