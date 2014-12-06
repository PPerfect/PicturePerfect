define(['requestsExecutor'], function (requestsExecutor) {

    'use strict';

    var uris = {
            USERS: 'users',
            PHOTO: 'classes/Photo',
            LOGIN: 'login',
            ALBUM: 'classes/Album',
            CATEGORY: 'classes/Category',
            COMMENT: 'classes/Comment'
        },
        contentTypes = {
            JSON: 'application/json',
            IMAGE_JPEG: 'image/jpeg'
        }
//TODO some request need to be changed in order to work.

    function Repository(baseUrl) {
        this.photos = new Photo(baseUrl + uris.PHOTO);
        this.users = new User(baseUrl);
        this.albums = new Album(baseUrl + uris.ALBUM);
        this.categories = new Category(baseUrl + uris.CATEGORY);
        this.comments = new Comment(baseUrl + uris.COMMENT);
    }

    var Photo = (function () {

        function Photo(url) {
            this.serviceUrl = url;

        }

        Photo.prototype.getAll = function (success, error) {
            requestsExecutor.get(this.serviceUrl, contentTypes.JSON, success, error);
        }

        Photo.prototype.getPhotoById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, success, error);

        }

        Photo.prototype.createPhoto = function (data, success, error) {
            requestsExecutor.post(this.serviceUrl, contentTypes.JSON, data, success, error);
        }

        Photo.prototype.deletePhotoById = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, contentTypes.JSON.success, error);
        }

        Photo.prototype.editPhoto = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, contentTypes.JSON, data, success, error)
        }

        Photo.prototype.getPhotosByAlbumId = function (albumId, success, error) {
            var url = this.serviceUrl + '?where={"albumId":{"__type":"Pointer","className":"Album","objectId":"' + albumId + '"}}';
            requestsExecutor.get(url, contentTypes.JSON, success, error);
        }
    
        return Photo;

    }());

    var User = (function () {

        function User(url) {
            this.serviceUrl = url;
        }

        User.prototype.getAllUsers = function (success, error) {

            requestsExecutor.get(this.serviceUrl + uris.USERS, contentTypes.JSON, success, error);
        }

        User.prototype.login = function (username, password, success, error) {

            var url = this.serviceUrl + uris.LOGIN + '?username=' + username + '&password=' + password;

            requestsExecutor.get(url, contentTypes.JSON, success, error);

        }

        User.prototype.register = function (username, password, success, error) {

            var data = JSON.stringify({'username': username, 'password': password});

            requestsExecutor.post(this.serviceUrl + uris.USERS, contentTypes.JSON, data, success, error);
        }

        return User;

    }());

    var Album = (function () {

        function Album(url) {
            this.serviceUrl = url;
        }

        Album.prototype.getAll = function (success, error) {
            requestsExecutor.get(this.serviceUrl, contentTypes.JSON, success, error);
        }

        Album.prototype.getAlbumById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, contentTypes.JSON, success, error);

        }

        Album.prototype.createAlbum = function (userObjectId, data, success, error) {
            var url = this.serviceUrl + '?where={"userId":{"__type":"Pointer","className":"_User","objectId":"' + userObjectId + '"}}';

            requestsExecutor.post(url, contentTypes.JSON, data, success, error);
        }

        Album.prototype.deleteAlbumById = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, success, error);
        }

        Album.prototype.editAlbum = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, contentTypes.JSON, data, success, error);
        }


        Album.prototype.getAlbumsByCategoryId = function (categoryId, success, error) {
            var url = this.serviceUrl + '?where={"categoryId":{"__type":"Pointer","className":"Category","objectId":"' + categoryId + '"}}';
            requestsExecutor.get(url, contentTypes.JSON, success, error);
        }


        //TODO getAlbumsByUserId

        return Album;

    }());

    var Category = (function () {

        function Category(url) {
            this.serviceUrl = url;
        }

        Category.prototype.getAll = function (success, error) {
            requestsExecutor.get(this.serviceUrl, contentTypes.JSON, success, error);
        }

        Category.prototype.getCategoryById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, contentTypes.JSON, success, error);
        }

        Category.prototype.createCategory = function (data, success, error) {
            requestsExecutor.post(this.serviceUrl, contentTypes.JSON, data, success, error);
        }

        Category.prototype.deleteCategoryById = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, success, error);
        }

        Category.prototype.editCategory = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, contentTypes.JSON, data, success, error);
        }

        return Category;
    }());

    var Comment = (function () {

        function Comment(url) {
            this.serviceUrl = url;
        }

        Comment.prototype.getAll = function (success, error) {
            requestsExecutor.get(this.serviceUrl, contentTypes.JSON, success, error);
        }

        Comment.prototype.getCommentById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, contentTypes.JSON, success, error);
        }

        Comment.prototype.createComment = function (data, success, error) {
            requestsExecutor.post(this.serviceUrl, contentTypes.JSON, data, success, error);
        }

        Comment.prototype.deleteCommentById = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, success, error);
        }

        Comment.prototype.editComment = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, contentTypes.JSON, data, success, error);
        }

        Comment.prototype.getCommentsByAlbumId = function (albumID, success, error) {
            var url = this.serviceUrl + '?where={"albumId":{"__type":"Pointer","className":"Album","objectId":"' + albumID + '"}}';

            requestsExecutor.get(url, success, error);
        }
        return Comment;
    }());


    return {
        get: function get(baseUrl) {
            return new Repository(baseUrl);
        }
    }

});

