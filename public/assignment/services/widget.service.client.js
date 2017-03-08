(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "findAllWidgets": findAllWidgets
        };
        return api;
        //function createWidget(pageId, widget) {
        //    if(widgets.includes(widget)) {
        //        return false;
        //    } else {
        //        widget.pageId = pageId;
        //        users.add(widget);
        //        return true;
        //    }
        //}

        function createWidget(pageId) {
            return $http.post("/api/page/" + pageId +"/widget");

        }
        function findWidgetsByPageId(pageId) {
          return $http.get("/api/page/"+pageId +"/widget");
        }
        function findAllWidgets(pageId) {
            return $http.get("/api/page/"+pageId +"/widget/new");
        }
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId,widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

    }
})();