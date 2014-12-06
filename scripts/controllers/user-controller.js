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

    UserController.prototype.logout = function logout() {
        sessionStorage.removeItem('PPUser');
    };

    UserController.prototype.getLoggedUserData = function getLoggedUserData() {
        if (sessionStorage['PPUser']) {
            return JSON.parse(sessionStorage['PPUser']);
        }
    };

    UserController.prototype.setLoggedUserData = function setLoggedUserData(username, userID, sessionToken) {
        sessionStorage.setItem('PPUser', JSON.stringify({
            'username': username,
            'sessionToken': sessionToken,
            'userId': userID
        }));
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

    //TODO Log LoggedUser--->oconne automaticLogin
    UserController.prototype.autoLogin = function () {};

    return new UserController();
});