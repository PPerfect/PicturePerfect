define(['requestsExecutor'], function (requestsExecutor) {

    'use strict';

    var uris = {
            USERS: 'users',
            PHOTO: 'classes/Photo',
            LOGIN: 'login',
            ALBUM: 'classes/Album',
            CATEGORY: 'classes/Category',
            COMMENT: 'classes/Comment',
            VOTE: 'classes/Vote'
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
        this.votes = new Vote(baseUrl + uris.VOTE);
    }

    var Photo = (function () {

        function Photo(url) {
            this.serviceUrl = url;

        }

        Photo.prototype.uploadFile = function (file, success, error) {

            var serverUrl = 'https://api.parse.com/1/files/' + file.name;

            $.ajax({
                type: "POST",
                beforeSend: function (request) {
                    request.setRequestHeader("X-Parse-Application-Id", 'yXjxSDbNHW3w3rBzf4TuM0rGrvtrLvGs3hd7g1pV');
                    request.setRequestHeader("X-Parse-REST-API-Key", '0tFoO1UlPQn4q7CPi5LrXMgbrGne1cUGFFFXkSlD');
                    request.setRequestHeader("Content-Type", file.type);
                },
                url: serverUrl,
                data: file,
                processData: false,
                contentType: false,
                success: success,
                error: error
            });

        }


        Photo.prototype.getAll = function (success, error) {
            requestsExecutor.get(this.serviceUrl, contentTypes.JSON, success, error);
        }

        Photo.prototype.getPhotoById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, success, error);

        }

        Photo.prototype.createPhoto = function (file, fileNameArg, userId, albumId, success, error) {
            var user = {'__type': 'Pointer', 'className': '_User', 'objectId': userId},
                album = {'__type': 'Pointer', 'className': 'Album', 'objectId': albumId},

                fileName = fileNameArg.substr(0, fileNameArg.indexOf('.')),
                content = {"url": file.url, "name": "" + file.name + "", "__type": "File"},

                photoData;
            console.log()
            localStorage.setItem('newPhotoUrl', file.url);

            photoData = JSON.stringify({
                'photoName': fileName,
                'content': content,
                'userId': user,
                'albumId': album
            });
            console.log(photoData);

            requestsExecutor.post(this.serviceUrl, contentTypes.JSON, photoData, success, error);

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

        User.prototype.getUserById = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + uris.USERS + '/' + id, contentTypes.JSON, success, error);
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


        //TODO getAlbumsByUserId------>oconne
        Album.prototype.getAlbumsByUserId = function (userId, success, error) {
            //alert(userId);
            var url = this.serviceUrl + '?where={"userId":{"__type":"Pointer","className":"Albums","userId":"' + userId + '"}}';

            var url = this.serviceUrl + '?where={"userId":{"__type":"Pointer","className":"_User","objectId":"' + UserId + '"}}&include=categoryId';

            requestsExecutor.get(url, contentTypes.JSON, success, error);

        }


        //-------------------END-------->oconne


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

        Comment.prototype.createComment = function (content, userId, albumId, success, error) {
            var user = {'__type': "Pointer", 'className': '_User', 'objectId': userId},
                album = {'__type': "Pointer", 'className': 'Album', 'objectId': albumId},
                data = JSON.stringify({"content": content, "userId": user, "albumId": album});
            requestsExecutor.post(this.serviceUrl, contentTypes.JSON, data, success, error);
        }

        Comment.prototype.deleteCommentById = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, success, error);
        }

        Comment.prototype.editComment = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, contentTypes.JSON, data, success, error);
        }

        Comment.prototype.getCommentsByAlbumId = function (albumID, success, error) {
            console.log()
            var url = this.serviceUrl + '?where={"albumId":{"__type":"Pointer","className":"Album","objectId":"' + albumID + '"}}&include=userId';
            console.log(url);
            requestsExecutor.get(url, contentTypes.JSON, success, error);
        }
        return Comment;
    }());

    var Vote = (function () {
        function Vote(url) {
            this.serviceUrl = url;
        }

        Vote.prototype.getVotesWithAlbums = function getVotesWithAlbums(success, error) {
            var serviceUrl = this.serviceUrl + '?include=albumId';
            requestsExecutor.get(serviceUrl, contentTypes.JSON, success, error);
        };

        return Vote;
    }());

    return {
        get: function get(baseUrl) {
            return new Repository(baseUrl);
        }
    }

});

