define(['photoController', 'albumController', 'categoryController', 'userController'],
    function(photoController, albumController, categoryController, userController) { // added categoryController

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

        View.prototype.removeRegisterLink = function removeRegisterLink() {
            $('#reg-link').parent().remove();
        };

        View.prototype.loadLoginLink = function loadLoginLink(linkParent) {
            var _this = this;
            $(linkParent).append($('<li />').append($('<a href="#login" id="login-link">Login</a>')));

            $('#login-link').on('click', function loginLinkClickHandler() {
                if ($('#login-frm').length < 1) {
                    _this.loadUserLoginForm('#top-nav');
                    _this.removeLoginLink();

                    $('#login-btn').on('click', function onLoginButtonClick(ev) {
                        // TODO: send login data to server, hide login form, hide login link
                        var username = $('#username-login-input').val(),
                            password = $('#password-login-input').val();
                        ev.preventDefault();

                        _this.loginUser(username, password);

                    });
                }
            });
        };

        View.prototype.removeLoginLink = function removeLoginLink() {
            $('#login-link').parent().remove();
        };

        View.prototype.loadLogoutLink = function loadLogoutLink(selector) {
            var _this = this;
            $(selector).append($('<li />').append($('<a href="#logout" id="logout-link">Logout</a>')));

            $('#logout-link').on('click', function logoutLinkClickHandler() {
                _this.logout();
            });
        };

        View.prototype.removeLogoutLink = function removeLogoutLink() {
            $('#logout-link').parent().remove();
        };

        View.prototype.loadUserRegisterForm = function loadUserRegisterForm(selector) {
            $(selector).append($('<form id="register-frm" action=""></form>')
                .append($('<label>username <input type="text" id="username-reg-input" class="register-input"/></label>'))
                .append($('<label>password <input type="text" id="password-reg-input" class="register-input"/></label>'))
                .append($('<label>repeat password <input type="text" id="password-repeat-input" class="register-input"/></label>'))
                .append($('<input type="submit" id="reg-btn" value="Register"/>')));
        };

        View.prototype.removeUserRegisterForm = function removeUserRegisterForm() {
            $('#register-frm').remove();
        };

        View.prototype.loadUserLoginForm = function loadUserLoginForm(selector) {
            $(selector).append($('<form id="login-frm" action=""></form>')
                .append($('<label>username <input type="text" id="username-login-input" class="login-input"/></label>'))
                .append($('<label>password <input type="text" id="password-login-input" class="login-input"/></label>'))
                .append($('<input type="submit" id="login-btn" value="Login"/>')));
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
                        function(userRegisterData) {
                            console.dir(userRegisterData);
                            _this.removeUserRegisterForm();
                            _this.removeUserLoginForm();
                            _this.removeRegisterLink();
                            _this.removeLoginLink();

                            userController.setLoggedUserData(username, userRegisterData.objectId, userRegisterData.sessionToken);
                            _this.loadUserGreeting(username);
                        },
                        function(err) {
                            console.dir(err.responseText);
                        }
                    );
            }
        };

        View.prototype.loginUser = function loginUser(username, password) {
            var _this = this;
            userController.login(username, password)
                .then(
                    function(userLoginData) {
                        _this.removeUserRegisterForm();
                        _this.removeUserLoginForm();
                        _this.removeRegisterLink();
                        _this.removeLoginLink();

                        userController.setLoggedUserData(username, userLoginData.objectId, userLoginData.sessionToken);
                        _this.loadUserGreeting(username);
                    },
                    function(err) {
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
                    $.each(data.results, function(index, value) {
                        $('<li>' + value.photoName + '</li>').appendTo($ul);

                    });

                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.listAllAlbums = function() {
            albumController.getAllAlbums().then(
                function success(data) {
                    var $ul = $('#topAlbumsList');
                    $.each(data.results, function(index, value) {
                        $('<li>' + value.albumName + '</li>').appendTo($ul);

                    });
                }, function error(error) {
                    console.log(error);
                });
        }


        View.prototype.listAllCategories = function() {
            categoryController.getAllCategories().then(
                function success(data) {
                    var DEFAULT_IMAGE_URL = 'images/No_image.png';
                    $.each(data.results, function(index, value) {
                        var categoryId = value.objectId;
                        $('<div>' + value.categoryName + '</div>')
                            .attr('id', categoryId)
                            .addClass('category')
                            .css({
                                'background-image': 'url(' + DEFAULT_IMAGE_URL + ')',
                            })
                            // TODO write better css then that one below, it is just for developing
                            .css({
                                'background-repeat': 'no-repeat',
                                'background-size': '100%',
                                'color': 'darkcyan',
                                'width': '180px',
                                'height': '180px',
                                'text-align': 'center',
                                'float': 'left'
                            })
                            .appendTo('#imagesView');
                        $('#imagesView').css('display', 'inline-block'); // TODO REMOVE THIS !!!
                        changeCategoryBackgroundPhoto();
                    });
                }, function error(error) {
                    console.log(error);
                });
        }


        function changeCategoryBackgroundPhoto() {

            var $categories = $('.category');
            $categories.each(function() {
                var categoryId = this.id;
                albumController.getAlbumsByCategoryId(categoryId).then(
                    function success(data) {
                        var albums = data.results;
                        var randomAlbum = albums[Math.floor(Math.random() * albums.length)];
                        var randomAlbumId = randomAlbum.objectId;
                        photoController.getPhotosByAlbumId(randomAlbumId).then(
                            function succesed(dataPhotos) {
                                var photos = dataPhotos.results;
                                var randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                                var randomPhotoUrl = randomPhoto.content.url;
                                if (randomPhotoUrl) {
                                    var categoryIdStr = '#' + categoryId;
                                    $(categoryIdStr).css({
                                        'background-image' : 'url(' + randomPhotoUrl + ')',
                                    });
                                }
                            }, function errored(errored) {
                                console.log(errored);
                            });
                    }, function error(error) {
                        console.log(error);
                    });
                });
        }
        console.log(View);
        console.log(View.prototype);

        return new View();
});
