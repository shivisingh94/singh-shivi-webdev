module.exports = function(app) {

    app.post("/api/website/:websiteId/page/new", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
        {"_id": "141", "name": "Post 4", "websiteId": "234", "description": "Lorem"},
        {"_id": "142", "name": "Post 5", "websiteId": "789", "description": "Lorem"},
        {"_id": "143", "name": "Post 6", "websiteId": "789", "description": "Lorem"}
    ];

    function createPage(req, res) {
        console.log("This is req body " + JSON.stringify(req.body));
        var websiteId = req.params.websiteId;
        var pageName= req.body.name;
        var pageDesc = req.body.description;

        var pageId = Math.floor((Math.random()*6)+1);
        console.log("create NEW PAGE " + pageId + " " + websiteId + " " + pageName + " " + pageDesc);
        console.log("pages before new page added" + pages.length);
        //var widget = widgets.find(function (widget) {
        //    return widget._id == widgetId;
        //});
        //
        //if (widget) {
        //    res.json(false);
        //} else {
        var page = {"_id": pageId, "name": pageName, "websiteId":websiteId, "description": pageDesc};
        //widget._id = widgetId;
        //widget.widgetType = widgetType;
        pages.push(page);
        res.json(page);
        console.log("pages after new page added" + pages.length);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pageset = [];
        console.log("websiteId " + websiteId);
        for (var p in pages) {
            console.log("what even is happening in this find page by website id " + pages[p]);
            if (websiteId === pages[p].websiteId) {
                pageset.push(pages[p]);
                console.log("pageset added :" + pageset[p]);
            }
        }
        res.json(pageset);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            console.log(pages[p]);
            if (pages[p]._id == pageId) {
                res.json(pages[p]);
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body.page;
        console.log("update Page in server; page id, newPage " + pageId + "," +newPage);
        for (var p in pages) {
            if (pages[p]._id == pageId) {
              //  pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.json(pages[p]);
                break;
            }

        }
    }


    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.json(pages);
                break;

            }
        }

    }
};
