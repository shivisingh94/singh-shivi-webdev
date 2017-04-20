/**
 * Created by shivi_star on 4/15/2017.
 */
module.exports = function(app) {

    var mongoose = require('mongoose');

    var CommentSchema = mongoose.Schema({
        _post: {type: String, required: true},
        content: {type:String}
    }, {collection: 'comment.list'});
    return CommentSchema;
}


