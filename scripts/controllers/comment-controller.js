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
                console.log( data);
                console.log( '----------');
            },
            function error(error) {
                defer.reject(error);
            });
        return defer.promise();
    }




    return new CommentController();
});