module.exports = function(app) {

    app.post("/api/website/:websiteId/page", createPage);
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
        var page = req.body;
        res.json(page);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pageset = [];
        console.log("websiteId " + websiteId);
        for (var p in pages) {
            if (websiteId === pages[p].websiteId) {
                pageset.push(pages[p]);
                console.log("pageset added :" +pageset[p]);
            }
        }

        res.json(pageset);

    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                res.json(pages[p]);
            }
        }
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p].name = newPage.name;
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
                break;

            }
        }

    }
};
