    module.exports = function(app) {

        app.post("/api/user/:userId/website", createWebsite);
        app.get("/api/user/:userId/website", findWebsitesByUser);
        app.get("/api/website/:websiteId",findWebsiteById);
        app.put("/api/website/:websiteId", updateWebsite);
        app.delete("/api/website/:websiteId", deleteWebsite);

        var websites =
            [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var websiteId = req.params._id;

        var website = websites.find(function (user) {
            return website._id == websiteId;
        });

        if (website) {
           res.json(false);
        } else {
            website.developerId = userId;
            websites.add(website);
        }
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        console.log("do we even get in websitesbyuser and userID is :" + userId);

        var sites = [];
        console.log( "websites "+ websites);
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
                console.log(websites[w]);
            }
        }

        res.json(sites);
    }


    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                res.json(websites[w]);
            }
        }
        //return null;
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for(var w in websites) {
            if(websites[w]._id ==  websiteId) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(websites[w]);
                break;
            }

        }
    }

    function deleteWebsite(req) {
        var websiteId=req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites.splice(w,1);
                break;
            }
        }

    }


};