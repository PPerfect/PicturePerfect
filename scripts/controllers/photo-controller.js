define([ 'baseController'], function (baseController) {

    'use strict';

    function PhotoController() {

    }

    PhotoController.prototype = Object.create(baseController.prototype);

    PhotoController.prototype.getAllPhotos = function () {
        console.log(this.repository.photos);
        var defer = $.Deferred();
        this.repository.photos.getAll(
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );

        return defer.promise();
    }
    
    PhotoController.prototype.getPhotosByAlbumId = function (albumId) {
        console.log(this.repository.photos);
        var defer = $.Deferred();
        this.repository.photos.getPhotosByAlbumId(albumId,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );
        
        return defer.promise();
    }

    //getPhotosByUserId;


    return new PhotoController();
});