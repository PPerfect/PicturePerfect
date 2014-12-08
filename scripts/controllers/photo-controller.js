define(['baseController'], function (baseController) {

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

    PhotoController.prototype.createPhoto = function (file, albumId, userId) {
        var defer = $.Deferred(),
            _this = this,
            fileName = file.name;

        this.repository.photos.uploadFile(file,
            function (data) {

                _this.repository.photos.createPhoto(data, fileName, albumId, userId,
                    function success(data) {
                        defer.resolve(data);


                    },
                    function error(error) {
                        defer.reject(error);
                        ///console.log(error);
                    }
                );
            },
            function error(error) {
                console.log(error);
            })
        return defer.promise();
    }
    PhotoController.prototype.deletePhoto = function (id) {
        var defer = $.Deferred(),
            _this = this;

        //this.repository.photos.deleteFile(fileName,
        //    function (data) {
        //        console.log(data);

        _this.repository.photos.deletePhotoById(id,
            function success(data) {
                defer.resolve(data);

            },
            function error(error) {
                defer.reject(error);

            });
        //},
        //function (error) {
        //    console.log(error);
        //
        //})

        return defer.promise();
    }

    return new PhotoController();
});