/**
 * Created by shivi_star on 3/21/2017.
 */
module.exports = function(app) {
    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
      // _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        _user: {type: String},
        name: {type: String, required: true},
        description: String,
        //pages:[{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        pages:[{type:String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'website.list'});

    return WebsiteSchema
}