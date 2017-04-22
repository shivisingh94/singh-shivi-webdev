(function () {
    angular
        .module("DogGram")
        .controller("CommentListController", commentListController)
        .controller("NewCommentController", newCommentController)
        .controller("EditCommentController", editCommentController);


    function commentListController($routeParams, CommentService) {
        var vm = this;
        var postId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        function init() {
            CommentService.findCommentByPostId(postId).success(function (comments) {
                vm.comments = comments;
                console.log("there are " + comments.length + "COMMENTS in this array");
                vm.postId=postId;
                vm.userId=userId;

            })
        }
        init();

    }

    function newCommentController($routeParams, CommentService) {
        var vm = this;
        var postId = $routeParams["pid"];
        var userId = $routeParams["uid"];
        vm.postId=postId;
        vm.userId=userId;
        vm.createComment = createComment;
        function createComment(comment) {
           CommentService.createComment(vm.postId,comment);

        }
    }


    function editCommentController($routeParams, CommentService, $location) {
        var vm = this;
        var userId = $routeParams["uid"];
        var postId = $routeParams["pid"];
        var commentId= $routeParams["cid"];
        vm.userId=userId;
        vm.postId=postId;
        vm.commentId= commentId;
        vm.updateComment = updateComment;
        vm.deleteComment = deleteComment;
        function init() {
           var promise= CommentService.findCommentById(vm.commentId);
            promise.success(function(comment) {
                vm.comment = comment;
                console.log("COMMENT up in here" + vm.comment.content + vm.comment._post);

            })
        }
        init();


        function updateComment(comment) {
           CommentService.updateComment(vm.commentId, comment).success(function(comment) {
               // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId);
            });
        }
        function deleteComment() {
           CommentService.deleteComment(vm.commentId);
        }
    }


})();