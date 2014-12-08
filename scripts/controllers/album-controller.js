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

    //TODO getAlbumsByUserId---->oconne
    AlbumController.prototype.getAlbumsByUserId=function (UserId){
        console.log(this.repository.albums);

        var defer = $.Deferred();

        this.repository.albums.getAlbumsByUserId(UserId,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );

        return defer.promise();

    }

    AlbumController.prototype.getAlbumById= function (id) {
        var defer = $.Deferred();

        this.repository.albums.getAlbumById(id,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );

        return defer.promise();
    }

    AlbumController.prototype.updateAlbum= function (id,userId) {
        var defer = $.Deferred();

        this.repository.albums.updateAlbumWithNewVoteUser(id,userId,
            function success(data) {
                defer.resolve(data);
                console.log(data);
            },
            function error(error) {
                defer.reject(error);
                console.log(error);
            }
        );

        return defer.promise();
    }



    return new AlbumController();
});