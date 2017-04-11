var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//var passport      = require('passport');
//var cookieParser  = require('cookie-parser');
//var session       = require('express-session');
//
//app.use(session({
//    secret: 'this is the secret',
//    resave: true,
//    saveUninitialized: true
//}));
//app.use(cookieParser());
//app.use(passport.initialize());
//app.use(passport.session());

app.set('view engine', 'ejs');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var connectionString = 'mongodb://127.0.0.1:27017/test';

if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

require ("./test/app.js")(app, mongoose);

//require("./public/assignment/app.js");

var assignment = require("./assignment/app.js");
assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);