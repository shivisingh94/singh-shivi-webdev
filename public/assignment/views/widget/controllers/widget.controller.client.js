(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
        .controller("NewWidgetController", newWidgetController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController($sce, $routeParams, WidgetService) {

        var vm = this;

        vm.doYouTrustUrl = doYouTrustUrl;

        var pageId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        vm.pageId = pageId;
        vm.userId = userId;
        vm.websiteId= websiteId;
        console.log("userId for widget" + userId + vm.userId);
        console.log("websiteId for widget" +websiteId + vm.websiteId);
        console.log("pageId for widget" + pageId + vm.pageId);
        var promise = WidgetService.findWidgetsByPageId(pageId);
        promise.success(function (widgets) {
            vm.widgets = widgets;
            $('#widget-list')
                .sortable({
                    axis: "y"
                });
        })

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

    }

    function newWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        var pageId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        vm.pageId = pageId;
        vm.userId = userId;
        vm.websiteId= websiteId;

        // event handlers
        vm.createWidget= createWidget;
        WidgetService.findAllWidgets()
            .success(function (widgetTypes) {
            console.log("in findallwidgets" + widgetTypes);
            vm.widgetTypes = widgetTypes;
            })


        function createWidget(widget) {
            //var url = ''
            WidgetService.createWidget(vm.pageId, widget)
                .then( function(newWidget) {
                    console.log("in createwidget newwidget" + newWidget);
            $location.url("/user/${ vm.userId }/website/${ vm.websiteId }/page/${ vm.pageId }/widget/${ newWidget._id }");
        })
        }

    }

    function editWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.userId = $routeParams["uid"];
        // event handlers
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        console.log("in edit widget ontroller init");

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            console.log("Promise in widget up in here" + promise);
            promise.success(function(widget){
                vm.widget = widget;
                console.log("in edit widget ontroller init");
                console.log("Widget up in here" + vm.widget.widgetType + vm.widget._id);
            })

        }
        init();


        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
        }
        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);

        }
    }
})();