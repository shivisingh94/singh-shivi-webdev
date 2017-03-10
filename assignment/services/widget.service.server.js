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

    var widgets =
        [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "143", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "143", "text": "<p>Lorem ipsum</p>"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "143", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "567", "widgetType": "HEADER", "pageId": "143", "size": 4, "text": "Lorem ipsum"},
       //     {"_id": "789", "widgetType": "HTML", "pageId": "143", "text": "<p>Lorem ipsum</p>"}
        ];

    var widgetTypes =
        [
            {"type": "HEADER"},
            {"type": "HTML"},
            {"type": "IMAGE"},
            {"type": "YOUTUBE"}
        ];

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;

        widget.pageId = pageId;
        widgets.push( widget );
        console. log("createWidget " + widget);
        console. log("widgets length " + widgets.length);
        res.json(widget);
    }

    function findAllWidgets(req,res) {
        var page = req.body;
        console.log("widgeTypes in server " + widgetTypes);
        res.json(widgetTypes);
    }

    function findWidgetByPageId(req, res) {
        var pageId = req.params.pageId;
        var widgetset = [];
        console.log("pageId " + pageId);
        for (var w in widgets) {
            if (pageId === widgets[w].pageId) {
                widgetset.push(widgets[w]);
                console.log("widgetset added :" + widgetset[w]);
            }
        }
        res.json(widgetset);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                res.json(widgets[w]);
            }
        }
    }

    function getWidgetById(widgetId) {
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
               return (widgets[w]);
            }
        }
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.wigetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w] = widget;
                res.json(widgets[w]);
                break;
            }

        }
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.json(widgets);
                break;
            }
        }

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