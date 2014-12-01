define([ 'baseController'], function (baseController) {

    'use strict';

    function PhotoController() {

    }

    PhotoController.prototype = Object.create(baseController.prototype);

    PhotoController.prototype.getAllPhotos = function () {
        console.log(this.repository.photos)
        //TODO use promises
        var defer = $.Deferred();
        this.repository.photos.getAll(
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error)
            }
        )
        return defer.promise();
    }
    return new PhotoController();
});