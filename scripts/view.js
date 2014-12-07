define(['photoController', 'albumController', 'categoryController', 'userController', "commentController"],
    function (photoController, albumController, categoryController, userController, commentController) {
        // added categoryController
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
                        // _this.removeLoginLink();
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
                userController.register(username, password).then(
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
            userController.login(username, password).then(
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

        View.prototype.listAllCategories = function () {
            var _this = this;
            categoryController.getAllCategories().then(
                function success(data) {
                    var defaultImageUrl = 'images/no-image.png',
                        $categoryWrapper = $('<div/>').attr('id', 'category-wrapper');
                    $.each(data.results, function (index, value) {
                        _this.createPhotoHolder(value.categoryName, 'category', defaultImageUrl, value.objectId, $categoryWrapper);
                    });
                    $categoryWrapper.appendTo('#imagesView');

                    changeCategoryBackgroundPhoto();
                }, function error(error) {
                    console.log(error);
                });

            return _this;
        }

        function changeCategoryBackgroundPhoto() {
            var $categories = $('.category');
            $categories.each(function () {
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
                                        'background-image': 'url(' + randomPhotoUrl + ')'
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

        View.prototype.attachClickOnCategory = function () {
            var _this = this;
            $('#imagesView').on('click', '.category', function (ev) {
                ev.preventDefault();
                $('#category-wrapper').remove();
                var $albumWrapper = $('<div/>').attr('id', 'albums-wrapper').appendTo('#imagesView');
                albumController.getAlbumsByCategoryId($(this).attr('id')).then(
                    function success(data) {
                        var albums = data.results,
                            defaultImageUrl = 'images/no-image.png';
                        console.log(albums);
                        if (albums.length === 0) {
                            _this.createPhotoHolder('No Albums', 'album', defaultImageUrl, undefined, $albumWrapper);
                            return;
                        }
                        $.each(albums, function (index, value) {
                            _this.createPhotoHolder(value.albumName, 'album', defaultImageUrl, value.objectId, $albumWrapper);
                        });

                        changeAlbumBackgroundPhoto();
                    },
                    function error(error) {
                        console.log(error);
                    }
                );
            });

            return _this;
        }

        function changeAlbumBackgroundPhoto() {
            var $albums = $('.album');
            $albums.each(function () {
                var albumId = this.id;
                photoController.getPhotosByAlbumId(albumId).then(
                    function succesed(dataPhotos) {
                        var photos = dataPhotos.results;
                        var randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                        var randomPhotoUrl = randomPhoto.content.url;
                        if (randomPhotoUrl) {
                            var albumIdStr = '#' + albumId;
                            $(albumIdStr).css({
                                'background-image': 'url(' + randomPhotoUrl + ')'
                            });
                        }
                    }, function errored(errored) {
                        console.log(errored);
                    });
            }, function error(error) {
                console.log(error);
            });
        }

        View.prototype.attachClickOnAlbum = function () {
            var _this = this;
            $('#imagesView').on('click', '.album', function (ev) {
                var albumId = $(this).attr('id'),
                    $photosWrapper = $('<div/>').attr('id', 'photos-wrapper').appendTo('#imagesView');
                $('#albums-wrapper').remove();

                photoController.getPhotosByAlbumId(albumId).then(
                    function success(data) {
                        var photos = data.results,
                            noPhotos = 'noPhotos',
                            className = 'photo',
                            defaultImageUrl = 'images/no-image.png';

                        if (photos.length !== 0) {
                            photos.forEach(function (photo) {
                                _this.createPhotoHolder(photo.photoName, className, photo.content.url, photo.objectId, $photosWrapper);
                            });
                        } else {
                            _this.createPhotoHolder(noPhotos, className, defaultImageUrl, noPhotos, $photosWrapper);
                        }

                        _this.loadCommentsForAlbum(albumId, $('#albums-view'));
                    }, function error(error) {
                        console.log(error);
                    });
            });

            return _this;
        }

        View.prototype.attachClickOnPhoto = function () {
            var _this = this;
            $('#imagesView').on('click', '.photo', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                $('#photos-wrapper').remove();
                var $photoViewer = $('<div/>').attr('id', 'photo-viewer'),
                    currImgUrl = $(this).css('background-image');
                currImgUrl = currImgUrl.substr(4, currImgUrl.length - 5);

                console.log(currImgUrl);
                $photoViewer
                    .css({
                        // todo move this in css file
                        'position': 'absolute',
                        'top': '10%',
                        'left': '10%',
                        'width': '80%',
                        'height': '80%',
                        'background-image': 'url(' + currImgUrl + ')',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    }).appendTo($('#imagesView'));

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
                    'background-size': '100% 100%'
                })
                .appendTo(appendTo);
        }


        View.prototype.loadCommentsForAlbum = function (albumId, parent) {
            var $albumCommentsWrapper = $('<div/>').attr('id', 'album-comments-wrapper').appendTo(parent),
                $commentsContainer=$('<div/>').attr('id','album-comments-container').appendTo($albumCommentsWrapper),
                $addCommentWrapper = this.generateAddCommentDiv(),
                _this = this,
                $comment;

            commentController.getCommentsByAlbumId(albumId).then(
                function success(data) {
                    var comments = data.results;
                    $commentsContainer.append('<h3 id="comments-title">Comments</h3>');

                    if (comments.length > 0) {
                        $.each(comments, function (index, value) {
                            console.log(value);
                            _this.generateComment(value.content, value.userId.username, $commentsContainer);

                        })
                        if (sessionStorage.getItem('PPUser') !== null) {
                            $addCommentWrapper.appendTo($albumCommentsWrapper);
                            _this.attachClickSubmitAlbumCommentHandler(albumId);
                        }
                    }
                },
                function error(error) {
                    console.log(error);
                }
            );
        }

        View.prototype.generateAddCommentDiv = function () {
            var $addCommentWrapper = $('<div/>').attr('id', 'add-album-comment-wrapper'),
                $content = $('<textarea  />').attr('id', 'add-comment-content').appendTo($addCommentWrapper),
                $addCommentBtn = $('<button>submit</button>').attr('id', 'add-comment-btn').appendTo($addCommentWrapper);

            return $addCommentWrapper;

        }
        View.prototype.generateComment = function (content, author, parent) {
            var $comment = $('<div/>').attr('class', 'comment-wrapper');
            $comment.append('<p class="comment-content">' + content + '</p>'),
                $comment.append('<output class="comment-author">' + author + '</output>');
            $comment.appendTo(parent);
        }

        View.prototype.attachClickSubmitAlbumCommentHandler = function (albumId) {
            var _this = this;
            $('#add-comment-btn').on('click', function (ev) {

                var commentContent = $('#add-comment-content').val(),
                    loggedData = userController.getLoggedUserData(),
                    loggedUsername = loggedData.username,
                    loggedUserId = loggedData.userId;

                commentController.createComment(commentContent, loggedUsername, loggedUserId, albumId).then(
                    function success(data) {
                        _this.generateComment(commentContent, loggedUsername, $('#album-comments-container'));
                    },
                    function error(error) {
                        console.log(error);
                    }
                )
                ev.preventDefault();
            })
        }
        // TODO check getLoggedUserData, visualizate Photos


        // TODO check  getLoggedUserData, visualizate Photos.Albums ------> oconne
        View.prototype.ListAlbumsByUserLogged = function () {

            var checkLoggedUser = userController.getLoggedUserData();

            if (checkLoggedUser != undefined) {
                // alert(checkLoggedUser.username); uncoment to se what hapened when page is refreshing
                if (!document.getElementById("user-greeting")) {
                    $('#user-log').html('<span id="user-greeting">Hello, ' + checkLoggedUser.username + '!</span>');
                    $('#login-link').parent().hide();// wrong behaviour
                    $('#reg-link').parent().hide();//wrong behaviour

                    //  loadLogoutLink('#top-nav ul'); doesnt work when calling in this way :)

                    if ($('#logout-link').length < 1) {
                        $('#top-nav ul').append($('<li />').append($('<a href="#logout" id="logout-link">Logout</a>')));
                        $('#logout-link').on('click', function logoutLinkClickHandler() {
                            this.logout();
                        });
                    }

                    albumController.getAlbumsByUserId(checkLoggedUser.userId).then(
                        function success(data) {

                            alert(JSON.stringify(data));


                        },
                        function error(error) {
                            console.log(error); //alert(JSON.stringify(error));
                        }
                    );
                }
            }
        }

        console.log(View);
        console.log(View.prototype);


        return new View();
    });
