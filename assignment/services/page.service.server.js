module.exports = function(app) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function createPage(req, res) {
        var page = req.body;
        res.json(page);
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        var pages = [];
        console.log("pages " + pages);
        for (var p in pages) {
            if (websiteId === pages[p].websiteId) {
                pages.push(pages[p]);
                console.log(pages[p]);
            }
        }

        res.json(pages);

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
}
