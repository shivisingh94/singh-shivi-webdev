module.exports = function(app) {

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.get("/api/page/:pageId/widget/new", findAllWidgets);
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/upload", upload.single("myFile"), uploadImage);
    getWidgetById;


    require('../models/widget.model.server.js')();
    var widgetModel = model.widgetModel;


    function createWidget(req, res) {
        var widgetType= req.body.widgetType;
        var pageId = req.params.pageId;
        var widgetId = Math.floor((Math.random()*6)+1);
        var widget = {"_id": widgetId, "widgetType": widgetType, "pageId": pageId};

        widgetModel
            .createWidget(pageId, widget)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        }

    function findWidgetByPageId(req, res) {
        var pageId = req.params.pageId;;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.send(widgets);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.wigetId;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }
    function uploadImage(req, res) {
        console.log("in upload image server")

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.params.websiteId;
        console.log("websiteID in widget.service is " + websiteId);
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        console.log("widgetId  for widget " + widgetId);
        var widget = getWidgetById(widgetId);
        console.log(widget);
        widget.url = '/uploads/'+filename;

        var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

        res.redirect(callbackUrl);
}
};