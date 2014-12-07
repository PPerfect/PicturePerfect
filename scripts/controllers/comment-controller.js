define(['baseController'], function (baseController) {

    'use strict';


    function CommentController() {

    }

    CommentController.prototype = Object.create(baseController.prototype);

    CommentController.prototype.getCommentsByAlbumId = function (albumId) {

        var defer = $.Deferred();

        this.repository.comments.getCommentsByAlbumId(albumId,
            function success(data) {
                defer.resolve(data);


            },
            function error(error) {
                defer.reject(error);
            });
        return defer.promise();
    }

    CommentController.prototype.createComment=function(content,username,userId,albumId){
        var defer = $.Deferred();
        this.repository.comments.createComment(content,userId,albumId,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            });
        return defer.promise();
    }

    return new CommentController();
});