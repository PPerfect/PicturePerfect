define(['photoController', 'albumController', 'categoryController', 'userController'],
    function (photoController, albumController, categoryController, userController) { // added categoryController

        'use strict';

        //TODO we should take decision whether to separate the view

        function View() {

        }

        View.prototype.loadRegisterLink = function loadRegisterLink(linkParent) {
            var _this = this;
            if ($('#reg-link').length < 1) {
                $(linkParent).append($('<li />').append($('<a href="#register" id="reg-link">Register</a>')));

                $('#reg-link').on('click', function registerLinkClickHandler(ev) {
                    if ($('#login-frm').length > 0) {
                        _this.removeUserLoginForm();
                    }

                    if ($('#register-frm').length < 1) {
                        _this.loadUserRegisterForm('#top-nav');

                        $('#reg-btn').on('click', function onRegisterButtonClick(ev) {
                            var username = $('#username-reg-input').val(),
                                password = $('#password-reg-input').val(),
                                repeatPassword = $('#password-repeat-input').val();

                            ev.preventDefault();
                            _this.registerUser(username, password, repeatPassword);
                        });
                    }
                });
            }
        };

        View.prototype.removeRegisterLink = function removeRegisterLink() {
            $('#reg-link').parent().remove();
        };

        View.prototype.loadLoginLink = function loadLoginLink(linkParent) {
            var _this = this;
            if ($('#login-link').length < 1) {
                $(linkParent).append($('<li />').append($('<a href="#login" id="login-link">Login</a>')));

                $('#login-link').on('click', function loginLinkClickHandler() {
                    if ($('#register-frm').length > 0) {
                        _this.removeUserRegisterForm();
                    }

                    if ($('#login-frm').length < 1) {
                        _this.loadUserLoginForm('#top-nav');
//                        _this.removeLoginLink();

                        $('#login-btn').on('click', function onLoginButtonClick(ev) {
                            // TODO: send login data to server, hide login form, hide login link
                            var username = $('#username-login-input').val(),
                                password = $('#password-login-input').val();
                            ev.preventDefault();

                            _this.loginUser(username, password);

                        });
                    }
                });
            }
        };

        View.prototype.removeLoginLink = function removeLoginLink() {
            $('#login-link').parent().remove();
        };

        View.prototype.loadLogoutLink = function loadLogoutLink(selector) {
            var _this = this;
            if ($('#logout-link').length < 1) {
                $(selector).append($('<li />').append($('<a href="#logout" id="logout-link">Logout</a>')));

                $('#logout-link').on('click', function logoutLinkClickHandler() {
                    _this.logout();
                });
            }
        };

        View.prototype.removeLogoutLink = function removeLogoutLink() {
            $('#logout-link').parent().remove();
        };

        View.prototype.loadUserRegisterForm = function loadUserRegisterForm(selector) {
            if ($('#register-frm').length < 1) {
                $(selector).append($('<form id="register-frm" action=""></form>')
                    .append($('<label>username <input type="text" id="username-reg-input" class="register-input"/></label>'))
                    .append($('<label>password <input type="text" id="password-reg-input" class="register-input"/></label>'))
                    .append($('<label>repeat password <input type="text" id="password-repeat-input" class="register-input"/></label>'))
                    .append($('<input type="submit" id="reg-btn" value="Register"/>')));
            }
        };

        View.prototype.removeUserRegisterForm = function removeUserRegisterForm() {
            $('#register-frm').remove();
        };

        View.prototype.loadUserLoginForm = function loadUserLoginForm(selector) {
            if ($('#login-frm').length < 1) {
                $(selector).append($('<form id="login-frm" action=""></form>')
                    .append($('<label>username <input type="text" id="username-login-input" class="login-input"/></label>'))
                    .append($('<label>password <input type="text" id="password-login-input" class="login-input"/></label>'))
                    .append($('<input type="submit" id="login-btn" value="Login"/>')));
            }
        };

        View.prototype.removeUserLoginForm = function removeUserLoginForm() {
            $('#login-frm').remove();
        };

        View.prototype.loadUserGreeting = function loadUserGreeting(username) {
            $('#user-log').append($('<span id="user-greeting">Hello ' + username + '!</span>'));
        };

        View.prototype.removeUserGreeting = function removeUserGreeting() {
            $('#user-greeting').remove();
        };

        View.prototype.registerUser = function registerUser(username, password, repeatPassword) {
            var _this = this;
            if (password != repeatPassword) {
                throw new Error('Passwords do not match!');
            } else {
                userController.register(username, password)
                    .then(
                    function (userRegisterData) {
                        console.dir(userRegisterData);
                        _this.removeUserRegisterForm();
                        _this.removeUserLoginForm();
                        _this.removeRegisterLink();
                        _this.removeLoginLink();
                        _this.loadLogoutLink($('#top-nav ul'));

                        userController.setLoggedUserData(username, userRegisterData.objectId, userRegisterData.sessionToken);
                        _this.loadUserGreeting(username);
                    },
                    function (err) {
                        console.dir(err.responseText);
                    }
                );
            }
        };

        View.prototype.loginUser = function loginUser(username, password) {
            var _this = this;
            userController.login(username, password)
                .then(
                function (userLoginData) {
                    _this.removeUserRegisterForm();
                    _this.removeUserLoginForm();
                    _this.removeRegisterLink();
                    _this.removeLoginLink();
                    _this.loadLogoutLink($('#top-nav ul'));

                    userController.setLoggedUserData(username, userLoginData.objectId, userLoginData.sessionToken);
                    _this.loadUserGreeting(username);
                },
                function (err) {
                    console.dir(err.responseText);
                }
            );
        };

        View.prototype.logout = function logout() {
            var _this = this;
            userController.logout();
            _this.loadLoginLink('#top-nav ul');
            _this.loadRegisterLink('#top-nav ul');
            _this.removeLogoutLink();
            _this.removeUserGreeting();
        };

        //=========================================================== Delete This Line

        View.prototype.listAllPhotos = function listAllPhotos() {
            console.log(photoController);

            photoController.getAllPhotos().then(
                function success(data) {
                    console.log('----------------');
                    console.log(data);
                    console.log('----------------');
                    var $ul = $('<ul/>').appendTo(document.body);
                    $.each(data.results, function (index, value) {
                        $('<li>' + value.photoName + '</li>').appendTo($ul);

                    });

                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.listAllAlbums = function () {
            albumController.getAllAlbums().then(
                function success(data) {
                    var $ul = $('#topAlbumsList');
                    $.each(data.results, function (index, value) {
                        $('<li>' + value.albumName + '</li>').appendTo($ul);

                    });

                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.listAlbumsByCategory = function (categoryId) {
            albumController.getAlbumsByCategoryId(categoryId).then(
                function success(data) {
                    $.each(data.results, function (index, value) {
                        var name = value.albumName;
                        $('<div>')
                            .text(name)
                            .css('color', 'red')
                            .appendTo($('body')); // TODO fix it harcoded body and css
                    });
                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.photosByAlbumId = function (albumId) {
            photoController.getPhotosByAlbumId(albumId).then(
                function success(data) {
                    //alert(JSON.stringify(data)); // TODO remove this it checks that the request is working
                    $.each(data.results, function (index, value) {
                        var name = value.photoName;
                        $('<div>')
                            .text(name)
                            .css('color', 'blue')
                            .appendTo($('body')); // TODO fix it harcoded body and css
                    });
                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.listAllCategories = function () {
            categoryController.getAllCategories().then(
                function success(data) {
                    var defaultImageUrl = 'images/logo.png';
                    $.each(data.results, function (index, value) {
                        $('<div>' + value.categoryName + '</div>')
                            .addClass('category')
                            .css({
                                'background-image': 'url(' + defaultImageUrl + ')',
                                'background-repeat': 'no-repeat',
                                'background-size': '100%'
                            })
                            // TODO write better css then that one below, it is just for developing
                            .css({
                                'color': 'white',
                                'width': '180px',
                                'height': '180px',
                                'text-align': 'center',
                                'float': 'left'
                            })
                            .appendTo('#imagesView');

                        $('#imagesView').css('display', 'inline-block'); // TODO REMOVE THIS !!!

                    });
                }, function error(error) {
                    console.log(error);
                });
        }


       // TODO check  getLoggedUserData, visualizate Photos

        console.log(View);
        console.log(View.prototype);


        return new View();
    });
