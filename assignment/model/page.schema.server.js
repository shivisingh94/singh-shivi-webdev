/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function(app) {
    app.post("/api/website/:websiteId/page/new", createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
       _website: Website,
        name: {type:String, required: true},
        title: {type:String, required: true},
        description: String,
        widgets: [Widget],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'page.list'});
}


