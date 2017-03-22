/**
 * Created by shivi_star on 3/21/2017.
 */
module.exports = function(app) {
    app.post("/api/user/:userId/website/new", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
       _user: User,
        name: {type: String, required: true},
        description: String,
        pages:[Page],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'website.list'});
}