define(['baseController'], function (baseController) {

    'use strict';

    function AlbumController() {

    }

    AlbumController.prototype = Object.create(baseController.prototype);

    AlbumController.prototype.getAllAlbums = function () {
        console.log(this.repository.photos);

        var defer = $.Deferred();

        this.repository.albums.getAll(
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );

        return defer.promise();
    }
    
    AlbumController.prototype.getAlbumsByCategoryId = function (categoryId) {
        console.log(this.repository.albums);
        
        var defer = $.Deferred();
        
        this.repository.albums.getAlbumsByCategoryId(categoryId,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );
        
        return defer.promise();
    }
    return new AlbumController();
});