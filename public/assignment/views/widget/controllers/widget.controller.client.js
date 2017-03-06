(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
        .controller("NewWidgetController", newWidgetController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController($routeParams, WidgetService) {

        var vm = this;
        var pageId = $routeParams["pid"];
        var promise = WidgetService.findWidgetsByPageId(pageId);
        promise.success(function (widgets) {
            vm.widgets = widgets;
        })
    }

    function newWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        // event handlers
        vm.createWidget= createWidget;

        function createWidget(widget) {
            WidgetService.createWidget(vm.pageId, widget);
        }

    }
    function editWidgetController($routeParams, WidgetService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        // event handlers
        vm.createWidget= createWidget;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
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