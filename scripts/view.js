define(['photoController', 'albumController', 'categoryController', 'userController', "commentController"],
    function (photoController, albumController, categoryController, userController, commentController) { // added categoryController

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
            photoController.getAllPhotos().then(
                function success(data) {
                    console.log(data);
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

        //View.prototype.listAlbumsByCategory = function (categoryId) { //TODO remove this
        //    albumController.getAlbumsByCategoryId(categoryId).then(
        //        function success(data) {
        //            $.each(data.results, function (index, value) {
        //                var name = value.albumName;
        //                $('<div>')
        //                    .text(name)
        //                    .css('color', 'red')
        //                    .appendTo($('body')); // TODO fix it harcoded body and css
        //            });
        //        }, function error(error) {
        //            console.log(error);
        //        });
        //}

        //View.prototype.photosByAlbumId = function (albumId) {//TODO remove this
        //    photoController.getPhotosByAlbumId(albumId).then(
        //        function success(data) {
        //            //alert(JSON.stringify(data)); // TODO remove this it checks that the request is working
        //            $.each(data.results, function (index, value) {
        //                var name = value.photoName;
        //                $('<div>')
        //                    .text(name)
        //                    .css('color', 'blue')
        //                    .appendTo($('body')); // TODO fix it harcoded body and css
        //            });
        //        }, function error(error) {
        //            console.log(error);
        //        });
        //
        //    return this;
        //}

        View.prototype.listAllCategories = function () {
            var _this = this
            categoryController.getAllCategories().then(
                function success(data) {
                    var defaultImageUrl = 'images/logo.png',
                        $categoryWrapper = $('<div/>').attr('id', 'category-wrapper');

                    $.each(data.results, function (index, value) {

                        _this.createPhotoHolder(value.categoryName, 'category', defaultImageUrl, value.objectId, $categoryWrapper);
                    });
                    $categoryWrapper.appendTo('#imagesView');
                }, function error(error) {
                    console.log(error);
                });

            return _this;
        }

        View.prototype.attachClickOnCategory = function () {
            var _this = this;
            $('#imagesView').on('click', '.category', function (ev) {
                ev.preventDefault();
                $('#category-wrapper').remove();
                var $albumWrapper = $('<div/>').attr('id', 'albums-wrapper').appendTo('#imagesView');
                albumController.getAlbumsByCategoryId($(this).attr('id')).then(
                    function success(data) {
                        var albums = data.results,
                            defaultImageUrl = 'images/logo.png';
                        console.log(albums)
                        if (albums.length === 0) {
                            _this.createPhotoHolder('No Albums', 'album', defaultImageUrl, undefined, $albumWrapper);
                            return;
                        }

                        $.each(albums, function (index, value) {

                            _this.createPhotoHolder(value.albumName, 'album', defaultImageUrl, value.objectId, $albumWrapper);
                        });
                    },
                    function error(error) {
                        console.log(error);
                    }
                );
            });

            return _this;
        }

        View.prototype.attachClickOnAlbum = function () {
            var _this = this;
            $('#imagesView').on('click', '.album', function (ev) {
                var albumId = $(this).attr('id'),
                    $imagesWrapper = $('<div/>').attr('id', 'images-wrapper').appendTo('#imagesView');
                $('#albums-wrapper').remove();
                photoController.getPhotosByAlbumId(albumId).then(
                    function success(data) {
                        var images = data.results,
                            defaultImageUrl = 'images/logo.png';

                        if (images.length === 0) {
                            _this.createPhotoHolder('No Images', 'images', defaultImageUrl, undefined, $imagesWrapper);
                            return;
                        }
                        $.each(images, function (index, value) {

                            _this.createPhotoHolder(undefined, 'images', value.content.url, value.objectId, $imagesWrapper);

                        });
                        _this.loadCommentsForAlbum(albumId,$imagesWrapper);

                    }, function error(error) {
                        console.log(error);
                    });
            });
            return _this;
        }


        View.prototype.createPhotoHolder = function (holderName, className, imageUrl, objectId, appendTo) {

            holderName = holderName || "";

            $('<div>' + holderName + '</div>').attr('id', objectId)
                .addClass(className)
                .css({
                    'background-image': 'url(' + imageUrl + ')',
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
                .appendTo(appendTo);
        }

        //TODO repeare this method to work
        View.prototype.loadCommentsForAlbum = function (albumId, parent) {
            var $albumCommentsWrapper = $('<div/>').attr('id', 'album-comments-wrapper').appendTo(parent),
                $comment;

            commentController.getCommentsByAlbumId(albumId).then(
                function success(data){
                    $.each(data.results, function (index, value) {
                        $comment=$('<div/>').html();

                        $albumCommentsWrapper.append($comment);
                    })

                },
                function error(error) {
                    console.log(error);
                }

            )


        }


        // TODO check  getLoggedUserData, visualizate Photos

        console.log(View);
        console.log(View.prototype);


        return new View();
    });
