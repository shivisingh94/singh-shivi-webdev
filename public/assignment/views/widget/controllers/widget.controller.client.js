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

    function newWidgetController($routeParams, $location, WidgetService, $timeout) {
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


        function createWidget(newWidget) {
            console.log("what is new Widget " + newWidget);

            $timeout(function() {
                var promise = WidgetService.createWidget(vm.pageId, newWidget);
                promise.success(function(newWidget) {
                    console.log("in createwidget newwidget" + newWidget);
                    console.log("in create wisget newWidget id" + newWidget._id);
                    $location.url("/user/"+vm.userId + "/website/"+ vm.websiteId +"/page/"+ vm.pageId + "/widget/"+ newWidget._id);

                })
            },1000);
            //console.log("promise in createWidget : " + promise);
            //promise.then( function(newWidget) {
            //        var newWidget=res.data;
                   //})
        }

    }

    function editWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        // event handlers
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;


        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            console.log("Promise in widget up in here" + promise);
            promise.success(function(widget){
                vm.widget = widget;
                console.log("in edit widget ontroller init");
                console.log("Widget up in here" + vm.websiteId + vm.widget.widgetType + vm.widget._id);
            })

        }
        init();
        function deleteWidget() {
            console.log("delete widget in controller");
            WidgetService.deleteWidget(vm.widgetId);
        }
        function updateWidget() {
            WidgetService.updateWidget(vm.widgetId).success(function(widget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            });

        }
    }
})();