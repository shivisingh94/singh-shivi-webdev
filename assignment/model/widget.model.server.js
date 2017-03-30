/**
 * Created by shivi_star on 3/22/2017.
 */
module.exports = function () {
    var q = require('q');
    var mongoose = require('mongoose');
    var widgetSchema = require('./widget.schema.server.js')();
   // var pageSchema = require('./page.schema.server.js')();

    var widgetModel = mongoose.model('WidgetModel', widgetSchema);
    var pageModel = require('./page.model.server').mongooseModel;

    var api = {
        "createWidget": createWidget,
        "findAllWidgetsForPage": findAllWidgetsForPage,
        "findWidgetById": findWidgetById,
        "updateWidget": updateWidget,
        "deleteWidget": deleteWidget,
        "getWidgetTypes": getWidgetTypes,
        mongooseModel: widgetModel
        //,
        // "reorderWidget": reorderWidget
    };
    module.exports=api;

    function createWidget(pageId, widget) {
        var deferred = q.defer();
        widgetModel
            .create(widget, function (err, doc) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        pageModel
            .findById(pageId, function (err, page) {
                page.widgets.push(page);
                page.save();
                deferred.resolve(page);

            });

        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        widgetModel
            .find({'_page': pageId}, function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred= q.defer();
        widgetModel
            .findById(widgetId, function (err, docs) {
                if (err) {
                    deferred.abort();
                } else {
                    deferred.resolve();
                }

            });
        return deferred.promise;
    }
    function getWidgetTypes(){
        var widgetTypes = widgetModel.schema.path('type').enumValues;

        return widgetTypes;

    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel
            .update({_id:widgetId}, {
                $set: widget
            }, function (err, status) {
                deferred.resolve(status);
            });
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.remove({_id: widgetId}, function (err, status) {
            if (err) {
                deferred.abort(err);
            } else {
                deferred.resolve(status);
            }

        });
        return deferred.promise;
    }

    function reorderWidget(pageId, start,end) {
    }


}