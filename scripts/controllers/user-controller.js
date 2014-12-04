define(['baseController'], function (baseController) {

    'use strict';

    function UserController() {

    }

    UserController.prototype = Object.create(baseController.prototype);

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
        );
        return defer.promise();
    };

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
        );
        return defer.promise();
    };

    UserController.prototype.isLoggedIn = function isLoggedIn() {
        if (sessionStorage.ppUser) {
            return true;
        } else {
            return false;
        }
    };

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
        );
        return defer.promise();
    };

    return new UserController();
});