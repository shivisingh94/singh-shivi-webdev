    module.exports = function(app, model) {

        app.post("/api/user/:userId/website/new", createWebsite);
        app.get("/api/user/:userId/website", findWebsitesByUser);
        app.get("/api/website/:websiteId",findWebsiteById);
        app.put("/api/website/:websiteId", updateWebsite);
        app.delete("/api/website/:websiteId", deleteWebsite);

    var websiteModel = model.websiteModel;

    function createWebsite(req,res) {

        var websiteName = req.body.name;
        var websiteDesc = req.body.description;
        var userId = req.params.userId;
        var websiteId = Math.floor((Math.random() * 6) + 1);
        var website = {"_id": websiteId, "name": websiteName, "developerId": userId, "description": websiteDesc};

        websiteModel
            .createWebsite(websiteId, website)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
      websiteModel
          .findWebsiteById(websiteId)
          .then(function (user) {
                  res.send(user);
          }, function (err) {
              res.sendStatus(500).send(err);
          });
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;

         websiteModel
             .updateWebsite(websiteId, newWebsite)
             .then(function (status) {
                 res.send(status);
             }, function (err) {
                 res.sendStatus(500).send(err);
             });
    }

    function deleteWebsite(req) {
        var websiteId=req.params.websiteId;
       websiteModel
           .deleteWebsite(websiteId)
           .then(function (status) {
               res.send(status);
           }, function (err) {
               res.sendStatus(500).send(err);
           });
    }


};