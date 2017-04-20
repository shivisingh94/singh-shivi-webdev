/**
 * Created by shivi_star on 4/15/2017.
 */

module.exports = function(app) {

    var mongoose = require('mongoose');

    var PostSchema = mongoose.Schema({
        name: {type:String, required: true},
        url: {type:String, required: true},
        caption: {type:String, required: true},
        _user: {type: String, required: true},
        comments: [{type:String}],
        datePosted: {type: Date, default: Date.now}
    }, {collection: 'post.list'});
    return PostSchema;
}


