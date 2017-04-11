module.exports = function(app, model) {

    app.post("/api/website/:websiteId/page/new", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pageModel = model.pageModel;

    function createPage(req, res) {
        console.log("This is req body " + JSON.stringify(req.body));
        var websiteId = req.params.websiteId;
        var pageName= req.body.name;
        var pageDesc = req.body.description;
       // var pageId = Math.floor((Math.random()*6)+1);
        var page = {"name": pageName, "websiteId":websiteId, "description": pageDesc};

        pageModel
            .createPage(page)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body.page;

        pageModel
            .updatePage(pageId, newPage)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }


    function deletePage(req, res) {
        var pageId = req.params.pageId;
       pageModel
           .deletePage(pageId)
           .then(function (status) {
               res.send(status);
           }, function (err) {
               res.sendStatus(500).send(err);
           });
    }
};
