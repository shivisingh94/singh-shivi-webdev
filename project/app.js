module.exports = function (app,model) {
    var userProjModel = require('./model/userproj.model.server.js')();
    var postModel = require('./model/post.model.server.js')();
    var commentModel = require('./model/comment.model.server.js')();
  //  var widgetModel = require('./model/widget.model.server.js')();
    var model = {
        postModel: postModel,
        userProjModel: userProjModel,
        commentModel: commentModel
       // widgetModel: widgetModel
    };
    require('./services/post.service.server.js')(app, model);
    require('./services/user.service.server.js')(app, model);
    require('./services/comment.service.server.js')(app, model);
    //require('./services/widget.service.server.js')(app, model);
};