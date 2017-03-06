module.exports = function(app) {

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets =
        [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "141", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "567", "widgetType": "HEADER", "pageId": "143", "size": 4, "text": "Lorem ipsum"},
            {"_id": "789", "widgetType": "HTML", "pageId": "143", "text": "<p>Lorem ipsum</p>"}
        ];

    function createWidget(req, res) {
        var page = req.body;
        res.json(page);
    }

    function findWidgetByPageId(req, res) {
        var pageId = req.params.pageId;
        var widgetset = [];
        console.log("websiteId " + websiteId);
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

    function updateWidget(req, res) {
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
};