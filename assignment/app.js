module.exports = function (app) {
    var pageModel = require('./model/page.model.server.js')();
    var userModel = require('./model/user.model.server.js');
    var websiteModel = require('./model/website.model.server.js')();
    var widgetModel = require('./model/widget.model.server.js')();
    var model = {
        pageModel: pageModel,
        userModel: userModel,
        websiteModel: websiteModel,
        widgetModel: widgetModel
    };
    require('./services/page.service.server.js')(app, model);
    require('./services/user.service.server.js')(app, model);
    require('./services/website.service.server.js')(app, model);
    require('./services/widget.service.server.js')(app, model);
};