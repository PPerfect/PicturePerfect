define(['baseController'], function (baseController) {

    'use strict';

    function UserController() {

    }

    UserController.prototype = Object.create(baseController.prototype);

    UserController.prototype.getAllAlbums = function () {
        console.log(this.repository.photos);

        var defer = $.Deferred();

        this.repository.users.getAll(
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        )
        return defer.promise();
    }


    UserController.prototype.register = function (username, password) {
        console.log(this.repository.photos);

        var defer = $.Deferred();

        this.repository.users.register(username, password,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        )
    }

    UserController.prototype.login = function (username, password) {
        console.log(this.repository.photos);

        var defer = $.Deferred();

        this.repository.users.login(username, password,
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(data);
            }
        )
    }
    return new UserController();
});