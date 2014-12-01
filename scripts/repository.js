define(['requestsExecutor'], function (requestsExecutor) {

    'use strict';

    var uris = {
        USERS: 'users',
        PHOTOS: 'classes/Photo'
    }


    function Repository(baseUrl) {
        this.photos = new Data(baseUrl + uris.PHOTOS);
        this.users = new Data(baseUrl + uris.USERS);
    }

    var Data = (function () {

        function Data(url) {
            this.serviceUrl = url;

        }

        Data.prototype.getAll = function (contentType,success, error) {
            console.log(this.serviceUrl+ '          servis url in repo')
            requestsExecutor.get(this.serviceUrl,contentType, success, error);

        }
        Data.prototype.get = function (id, success, error) {
            requestsExecutor.get(this.serviceUrl + '/' + id, success, error);

        }
        Data.prototype.create = function (data, success, error) {
            requestsExecutor.post(this.serviceUrl, data, success, error);
        }

        Data.prototype.delete = function (id, success, error) {
            requestsExecutor.delete(this.serviceUrl + '/' + id, success, error);
        }


        Data.prototype.edit = function (id, data, success, error) {
            requestsExecutor.put(this.serviceUrl + '/' + id, data, success, error)
        }

        return Data;

    }());

    return {
        get: function get(baseUrl) {
            return new Repository(baseUrl);
        }
    }


});

