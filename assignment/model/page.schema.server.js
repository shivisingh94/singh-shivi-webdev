/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function(app) {

    var mongoose = require('mongoose');

    var PageSchema = mongoose.Schema({
       _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: {type:String, required: true},
        title: {type:String, required: true},
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'page.list'});
    return PageSchema;
}


