define(['photoController', 'albumController', 'categoryController', 'userController'],
    function (photoController, albumController, categoryController, userController) { // added categoryController

        'use strict';

        //TODO we should take decision whether to separate the view

        function View() {

        }

        View.prototype.loadRegisterLink = function loadRegisterLink(linkParent) {
            var _this = this;

            $(linkParent).append($('<li />').append($('<a href="#register" id="reg-link">Register</a>')));

            $('#reg-link').on('click', function registerLinkClickHandler(ev) {
                if ($('#register-frm').length < 1) {
                    _this.loadUserRegisterForm('#top-nav');
//                    $('#reg-link').parent().remove();

                    $('#reg-btn').on('click', function onRegisterButtonClick(ev) {
                        var username = $('#username-reg-input').val(),
                            password = $('#password-reg-input').val(),
                            repeatPassword = $('#password-repeat-input').val();

                        ev.preventDefault();
                        _this.registerUser(username, password, repeatPassword);
                    });
                }
            });
        };

        View.prototype.loadLoginLink = function loadLoginLink(linkParent) {
            var _this = this;
            $(linkParent).append($('<li />').append($('<a href="#login" id="login-link">Login</a>')));

            $('#login-link').on('click', function loginLinkClickHandler() {
                if ($('#login-frm').length < 1) {
                    _this.loadUserLoginForm('#top-nav');
                    $('#login-link').parent().remove();

                    $('#login-btn').on('click', function onLoginButtonClick(ev) {
                        ev.preventDefault();
                        // TODO: send login data to server, hide login form, hide login link
                        //hide login form

                    });
                }
            });
        };

        View.prototype.loadLogoutLink = function loadLogoutLink(selector) {
            $(selector).append($('<li />').append($('<a href="#logout" id="logout-link">Logout</a>')));
        };

        View.prototype.loadUserRegisterForm = function loadUserRegisterForm(selector) {
            $(selector).append($('<form id="register-frm" action=""></form>')
                .append($('<label>username <input type="text" id="username-reg-input" class="register-input"/></label>'))
                .append($('<label>password <input type="text" id="password-reg-input" class="register-input"/></label>'))
                .append($('<label>repeat password <input type="text" id="password-repeat-input" class="register-input"/></label>'))
                .append($('<input type="submit" id="reg-btn" value="Register"/>')));
        };

        View.prototype.loadUserLoginForm = function loadUserLoginForm(selector) {
            $(selector).append($('<form id="login-frm" action=""></form>')
                .append($('<label>username <input type="text" id="username-login-input" class="login-input"/></label>'))
                .append($('<label>password <input type="text" id="password-login-input" class="login-input"/></label>'))
                .append($('<input type="submit" id="login-btn" value="Login"/>')));
        };

        View.prototype.loadUserGreeting = function loadUserGreeting(username) {
            $('#user-log').append($('<span id="user-greeting">Hello ' + username + '!</span>'));
        };

        View.prototype.registerUser = function registerUser(username, password, repeatPassword) {
            var _this = this;
            if (password != repeatPassword) {
                throw new Error('Passwords do not match!');
            } else {
                userController.register(username, password)
                    .then(
                    function (data) {
                        console.dir(data);
                        $('#register-frm').remove();
                        $('#reg-link').parent().remove();
                        $('#login-link').parent().remove();
                        sessionStorage.setItem('PPUser', JSON.stringify({
                            'sessionToken': data.sessionToken,
                            'userId': data.objectId
                        }));

                        _this.loadUserGreeting(username);
                    },
                    function (err) {
                        console.dir(err.responseText);
                    }
                );
            }
        };

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


        console.log(View);
        console.log(View.prototype);


        return new View();
    });
