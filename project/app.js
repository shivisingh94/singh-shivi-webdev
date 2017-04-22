module.exports = function (app,model) {
    // var commentModel = require('./model/comment.model.server.js')();
    // var userProjModel = require('./model/userproj.model.server.js')();
    // var postModel = require('./model/post.model.server.js')();

    //console.log('before');
    //setTimeout(function(){
    //    console.log('after');
    //},500);

  //  var widgetModel = require('./model/widget.model.server.js')();
  //   var model = {
  //       postModel: postModel,
  //       userProjModel: userProjModel,
  //       commentModel: commentModel
  //      // widgetModel: widgetModel
  //   };

    require('./services/user.service.server.js')(app);//, model);
    require('./services/comment.service.server.js')(app);//, model);
    require('./services/post.service.server.js')(app);//, model);
    //require('./services/widget.service.server.js')(app, model);
};