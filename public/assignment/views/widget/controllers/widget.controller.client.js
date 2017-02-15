(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController)
        .controller("NewWidgetController", newWidgetController)
        .controller("EditWidgetController", editWidgetController);

    function widgetListController($routeParams, WidgetService) {


        var userId = $routeParams["uid"];
        var websites = websiteService.findAllWebsites(userId);

        var vm = this;
        vm.websites = websites;
        vm.userId = userId;

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