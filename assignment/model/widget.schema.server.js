/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function(app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.get("/api/page/:pageId/widget/new", findAllWidgets);
    app.post("/api/upload", upload.single("myFile"), uploadImage);

    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: Page, required: true},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: {type:String, required: true},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'widget.list'});
}