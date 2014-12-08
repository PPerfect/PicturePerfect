define(['photoController', 'albumController', 'categoryController', 'userController', "commentController", "voteController", "jquery"],
    function (photoController, albumController, categoryController, userController, commentController, voteController, $) {
        // added categoryController
        'use strict';
        //TODO we should take decision whether to separate the view

        function View() {
        }

        //TODO delete commented code
        //View.prototype.uploadImage = function () {
        //
        //    var file;
        //
        //    // Set an event listener on the Choose File field.
        //    $('#fileselect').bind("change", function (e) {
        //        var files = e.target.files || e.dataTransfer.files;
        //        // Our file var now holds the selected file
        //        file = files[0];
        //    });
        //
        //    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
        //    $('#uploadPic').click(function () {
        //        var serverUrl = 'https://api.parse.com/1/files/' + file.name;
        //
        //        $.ajax({
        //            type: "POST",
        //            headers: {
        //                'X-Parse-Application-Id': 'yXjxSDbNHW3w3rBzf4TuM0rGrvtrLvGs3hd7g1pV',
        //                'X-Parse-REST-API-Key': '0tFoO1UlPQn4q7CPi5LrXMgbrGne1cUGFFFXkSlD'
        //            },
        //            contentType: file.type,
        //            url: serverUrl,
        //            data: file,
        //            processData: false,
        //            dataType: 'json',
        //            success: function (data) {
        //
        //                //Change variable to reflect your class to upload to
        //                var classUrl = "https://api.parse.com/1/classes/Photo";
        //
        //                if (data) {
        //                    var fileName = "" + data.name;
        //                    var finalData = {
        //                        "photoName" : file.name,
        //                        "content" : { "name" : "" + fileName + "", "__type" : "File" }
        //                    };
        //                    finalData = JSON.stringify(finalData);
        //
        //                    $.ajax({
        //                        type: "POST",
        //                        headers: {
        //                            'X-Parse-Application-Id': 'yXjxSDbNHW3w3rBzf4TuM0rGrvtrLvGs3hd7g1pV',
        //                            'X-Parse-REST-API-Key': '0tFoO1UlPQn4q7CPi5LrXMgbrGne1cUGFFFXkSlD'
        //                        },
        //                        contentType: 'application/json',
        //                        url: classUrl,
        //                        data: finalData,
        //                        processData: false,
        //
        //                        success: function(data) {
        //                            console.log("Image successfully uploaded.");
        //                        },
        //
        //                        error: function(error) {
        //                            console.log("Error: " + error.message);
        //                        }
        //                    });
        //                } else {
        //                    //Data is null
        //                    console.log("Data IS NULL");
        //                }
        //            },
        //            error: function (data) {
        //                var obj = jQuery.parseJSON(data);
        //                alert(obj.error);
        //            }
        //        });
        //    });
        //    };

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
                    .append($('<label>password <input type="password" id="password-reg-input" class="register-input"/></label>'))
                    .append($('<label>repeat password <input type="password" id="password-repeat-input" class="register-input"/></label>'))
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
                    .append($('<label>password <input type="password" id="password-login-input" class="login-input"/></label>'))
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

        View.prototype.loadLastAddedAlbums = function loadLastAddedAlbums(count) {
            var _this = this;
            albumController.getAllAlbums()
                .then(
                function (allAlbumsData) {
                    var lastAlbums = allAlbumsData.results.sort(function (a, b) {
                        return Date.parse(a.createdAt) < Date.parse(b.createdAt);
                    });
                    renderSpecialAlbums.call(_this, '#last-albums', lastAlbums, count);
                },
                function (err) {
                    console.log(err.responseText);
                }
            );
        };

        View.prototype.loadTopAlbums = function loadTopAlbums(count) {
            var _this = this;
            voteController.getVotesWithAlbums()
                .then(
                function (votesData) {
                    var sortedVotes = votesData.results.sort(function (a, b) {
                            return a.value < b.value;
                        }),
                        sortedAlbums = [];
                    for (var i = 0; i < sortedVotes.length; i++) {
                        var vote = sortedVotes[i];
                        console.log('sorted');
                        console.dir(vote);
                        if (vote.albumId) {
                            sortedAlbums.push(vote.albumId);
//                        sortedAlbums[i].votes = vote.value;
                        }
                    }
                    console.log('sorted');
                    console.dir(sortedAlbums);
                    renderSpecialAlbums.call(_this, '#top-albums', sortedAlbums, count);
                },
                function (err) {
                    console.log(err.responseText);
                }
//                    var topAlbums =
            );
        };

        function renderSpecialAlbums(selector, albums, count) {
            var _this = this,
                albumNumber = 0;
            albums.forEach(function (album) {
                if (albumNumber >= count) {
                    return false;
                }

                $(selector).append($('<li><a href="#/album/' + album.objectId + '" class="special-album" data-id="' + album.objectId + '">' + album.albumName + '</a></li>'));
                albumNumber++;
            });

            $(selector).on('click', '.special-album', function (ev) {

                var albumId = $(ev.target).attr('data-id');

//                $('#albums-wrapper').remove();
//                _this.loadPhotosByAlbumId(albumId);
            });
        }

        //TODO delete commented code
        //=========================================================== Delete This Line
        //View.prototype.listAllPhotos = function listAllPhotos() {
        //    photoController.getAllPhotos().then(
        //        function success(data) {
        //            console.log(data);
        //            var $ul = $('<ul/>').appendTo(document.body);
        //            $.each(data.results, function (index, value) {
        //                $('<li>' + value.photoName + '</li>').appendTo($ul);
        //            });
        //        }, function error(error) {
        //            console.log(error);
        //        });
        //}

        //=========================================================== Delete This Line
        //View.prototype.listAllPhotos = function listAllPhotos() {
        //    photoController.getAllPhotos().then(
        //        function success(data) {
        //            console.log(data);
        //            var $ul = $('<ul/>').appendTo(document.body);
        //            $.each(data.results, function (index, value) {
        //                $('<li>' + value.photoName + '</li>').appendTo($ul);
        //            });
        //        }, function error(error) {
        //            console.log(error);
        //        });
        //}

        //View.prototype.listAllAlbums = function () {
        //    albumController.getAllAlbums().then(
        //        function success(data) {
        //            var $ul = $('#topAlbumsList');
        //            $.each(data.results, function (index, value) {
        //                $('<li>' + value.albumName + '</li>').appendTo($ul);
        //            });
        //        }, function error(error) {
        //            console.log(error);
        //        });
        //}

        View.prototype.listAllCategories = function () {
            var _this = this;
            categoryController.getAllCategories().then(
                function success(data) {
                    var defaultImageUrl = 'images/no-image.png',
                        $categoryWrapper = $('<div/>').attr('id', 'category-wrapper');
                    $.each(data.results, function (index, value) {
                        _this.createPhotoHolder('Categoty: ' + value.categoryName, 'category', defaultImageUrl, value.objectId, $categoryWrapper);
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
                                if (randomPhoto.content.url) {
                                    var categoryIdStr = '#' + categoryId;
                                    $(categoryIdStr).css({
                                        'background-image': 'url(' + randomPhoto.content.url + ')'
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
                            _this.createPhotoHolder('Album:' + value.albumName, 'album', defaultImageUrl, value.objectId, $albumWrapper, value.userId.objectId, value.votedUsers);

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
                    albumOwnerId = $(this).find(' > .album-owner-id').val(),
                    votedUsers = $(this).find(' > .voted-users').val();

                $('#albums-wrapper').remove();
                _this.loadPhotosByAlbumId(albumId);

                _this.attachPhotoUploader(albumId, albumOwnerId);
                _this.attachVoteElements(albumId, albumOwnerId, votedUsers);
                _this.loadVotesByAlbumId(albumId);
                _this.loadCommentsForAlbum(albumId, $('#albums-view'));
            });
            return _this;
        }
        View.prototype.loadPhotosByAlbumId = function (albumId) {
            var _this = this,
                $photosWrapper = $('<div/>').attr('id', 'photos-wrapper').appendTo('#imagesView');
            photoController.getPhotosByAlbumId(albumId).then(
                function success(data) {
                    var photos = data.results,
                        noPhotos = 'noPhotos',
                        className = 'photo',
                        photoUrlArray = [],
                        counter = 0,
                        defaultImageUrl = 'images/no-image.png';

                    if (photos.length !== 0) {
                        photos.forEach(function (photo) {
                            if (photo.content !== undefined) {
                                photoUrlArray[counter] = photo.content.url;

                                //    _this.createPhotoHolder(photo.photoName, className, photo.content.url, photo.objectId, $photosWrapper);

                                _this.createPhotoHolder(photo.photoName, className, photo.content.url, counter, $photosWrapper);

                                counter++;
                            }
                        });
                        console.log(photos);
                        sessionStorage.setItem('photUrlsString', JSON.stringify(photoUrlArray));
                        //if(photos[1].userId!==undefined) {
                        //    sessionStorage.setItem('currentAlbumOwnerId', photos[1].userId.objectId);
                        //}

                    } else {
                        _this.createPhotoHolder(noPhotos, className, defaultImageUrl, noPhotos, $photosWrapper);
                    }

                }, function error(error) {
                    console.log(error);
                });
        }

        View.prototype.attachClickOnPhoto = function () {
            var _this = this;
            $('#imagesView').on('click', '.photo', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                var $photoViewer = $('<div/>').attr('id', 'photo-viewer'),
                    currImgUrl = $(this).css('background-image');
                currImgUrl = currImgUrl.substr(4, currImgUrl.length - 5);
                sessionStorage.setItem('currentImageIndex', $(this).attr('id')); // it is needed to know from where to start preview of next pictures
                console.log(currImgUrl);

                $photoViewer
                    .css({
                        // todo move this in css file
                        'position': 'absolute',
                        'top': '15%',
                        'left': '10%',
                        'width': '75%',
                        'height': '75%',
                        'background-image': 'url(' + currImgUrl + ')',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    });
                var $previousButton = $('<button>Previous</button>').attr('id', 'previous-button');
                var $nextButton = $('<button>Next</button>').attr('id', 'next-button');
                //var $infoButton = $('<button>Information</button>').attr('id', 'info-button'); // TODO there is no property info in picture delete if you diside that is useless
                var $deleteButton = $('<button>Delete Picture</button>').attr('id', 'delete-button');
                var $backButton = $('<button>Back to the Album</button>').attr('id', 'back-to-album-button');

                $photoViewer
                    .append($previousButton)
                    .append($nextButton)
                    //.append($infoButton)
                    .append($deleteButton)
                    .append($backButton);

                $('#container').hide();
                $photoViewer.appendTo($('body'));

            });

            return _this;
        }

        View.prototype.createPhotoHolder = function (holderName, className, imageUrl, objectId, appendTo, albumOwnerId, votedUsers) {
            holderName = holderName || "";
            if (imageUrl !== undefined) {
                $('<div>' + holderName + '</div>').attr('id', objectId).data('albumOwnerId', albumOwnerId)
                    .addClass(className)
                    .css({
                        'background-image': 'url(' + imageUrl + ')',
                        'background-repeat': 'no-repeat',
                        'background-size': '100% 100%'
                    })
                    .appendTo(appendTo);
                if (albumOwnerId !== undefined) {
                    var $inputHiddenAlbumUserIdHolder = $('<input type="hidden"/>').attr('class', 'album-owner-id').attr('value', albumOwnerId);
                    $('#' + objectId).append($inputHiddenAlbumUserIdHolder);
                }
                if (votedUsers !== undefined) {
                    var $inputHiddenVotedUsers = $('<input type="hidden"/>').attr('class', 'voted-users').attr('value', votedUsers);
                    $('#' + objectId).append($inputHiddenVotedUsers);
                }
            }
        }

        View.prototype.loadCommentsForAlbum = function (albumId, parent) {
            var $albumCommentsWrapper = $('<div/>').attr('id', 'album-comments-wrapper'),
                $commentsContainer = $('<div/>').attr('id', 'album-comments-container').appendTo($albumCommentsWrapper),
                $addCommentWrapper = this.generateAddCommentDiv(),
                _this = this,
                $comment;

            commentController.getCommentsByAlbumId(albumId).then(
                function success(data) {
                    var comments = data.results;
                    $commentsContainer.append('<h3 id="comments-title">Comments</h3>');

                    if (comments.length > 0) {
                        $albumCommentsWrapper.appendTo(parent);
                        $.each(comments, function (index, value) {
                            console.log(value);
                            _this.generateComment(value.content, value.userId.username, $commentsContainer);

                        });
                    }
                },
                function error(error) {
                    console.log(error);
                }
            );
            if (sessionStorage.getItem('PPUser') !== null) {
                $albumCommentsWrapper.appendTo(parent);
                $addCommentWrapper.appendTo($albumCommentsWrapper);
                _this.attachClickSubmitAlbumCommentHandler(albumId);
            }
        }

        View.prototype.eventsListener = function () {
            var _this = this,
                photosUrlArr,
                currentImageIndex,
                nextUrl;

            $('body').on('click', '#next-button', function (ev) {
                getLocalStorageItems();
                ev.preventDefault();
                ev.stopPropagation();
                var nextPhotoIndex = parseInt(currentImageIndex) + 1;
                if (nextPhotoIndex <= photosUrlArr.length - 1) {
                    sessionStorage['currentImageIndex'] = nextPhotoIndex;
                    nextUrl = photosUrlArr[nextPhotoIndex];
                } else {
                    nextUrl = photosUrlArr[0];
                    sessionStorage['currentImageIndex'] = '0';
                }

                $('#photo-viewer').css('background-image', 'url(' + nextUrl + ')');
            });

            $('body').on('click', '#previous-button', function (ev) {
                getLocalStorageItems();
                ev.preventDefault();
                ev.stopPropagation();
                var previousPhotoIndex = parseInt(currentImageIndex) - 1;
                if (previousPhotoIndex >= 0) {
                    sessionStorage['currentImageIndex'] = previousPhotoIndex;
                    nextUrl = photosUrlArr[previousPhotoIndex];
                } else {
                    nextUrl = photosUrlArr[photosUrlArr.length - 1];
                    sessionStorage['currentImageIndex'] = (photosUrlArr.length - 1).toString();
                }

                $('#photo-viewer').css('background-image', 'url(' + nextUrl + ')');
            });

            // TODO implement this if you disede to delete picture from here !!!
            $('body').on('click', '#delete-button', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            });


            //$('body').on('click', '#info-button', function (ev) {
            //    ev.preventDefault();
            //    ev.stopPropagation();
            //    //todo diside if you use that                 
            //});

            $('body').on('click', '#back-to-album-button', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                $('#container').show();
                $('#photo-viewer').remove();
            });

            function getLocalStorageItems() {
                photosUrlArr = JSON.parse(sessionStorage.getItem('photUrlsString'));
                currentImageIndex = sessionStorage.getItem('currentImageIndex');
            }

            return _this;
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
                );
                ev.preventDefault();
            })
        }

        View.prototype.attachPhotoUploader = function (albumId, albumOwnerId) {
            var $uploadFieldSet = $('<fieldset/>').attr('id', 'upload-field-set').appendTo($('#albums-view')),
                $inputFile = $('<input/>').attr('type', 'file').attr('id', 'file-select').attr('name', 'file-select'),
                $uploadBtn = $('<button>upload</button>').attr('id', 'upload-btn'),
                _this = this,
                file;
            if (sessionStorage.getItem('PPUser') != null && sessionStorage.getItem('PPUser') != undefined) {

                if (albumOwnerId === userController.getLoggedUserData().userId) {
                    $inputFile.appendTo($uploadFieldSet);
                    $uploadBtn.appendTo($uploadFieldSet);
                }
            }
            $inputFile.on('change', function (ev) {
                var files = ev.target.files;
                file = files[0];
            });

            $('#upload-btn').click(function () {
                var fileName = file.name;
                if (sessionStorage.getItem('PPUser') != null && sessionStorage.getItem('PPUser') != undefined) {
                    var userId = userController.getLoggedUserData().userId;
                    photoController.createPhoto(file, userId, albumId).then(
                        function success(data) {
                            fileName = fileName.substr(0, fileName.indexOf('.'));
                            console.log(data);
                            _this.createPhotoHolder(fileName, 'photo', localStorage.getItem('newPhotoUrl'), data.objectId, $('#photos-wrapper'));
                            _this.attachClickOnPhoto();

                        },
                        function error(error) {
                            console.log(error);
                        });
                }
            });
        }

        View.prototype.loadVotesByAlbumId = function (id) {

            voteController.getVotesByAlbumId(id).then(
                function success(data) {
                    var votesObj = data.results,
                        length = votesObj.length || 1,
                        rating = 0;
                    $.each(votesObj, function (index, value) {
                        rating += value.value;
                    });

                    rating = rating == 0 ? 0 : rating / votesObj.length;

                    $('#upload-field-set').append('<h3 id="album-rating">Rating: ' + rating + '</h3>')

                },
                function error(error) {
                    console.log(error);
                }
            );
        }

        View.prototype.attachVoteElements = function (albumId, albumOwnerId, votedUsers) {
            var $voteElements = this.generateVoteElements(),
                loggedUserId = userController.getLoggedUserData().userId,
                $parentFieldSet = $('#upload-field-set'),
                $uploadVoteBtn = $voteElements.find(' > button'),
                 $selectedVoteValue=$voteElements.find(' > select').val(),
                  votedUsersArr = votedUsers.split(',');

            console.log('album ownerId: ' + albumOwnerId + " ---- logged user id: " + userController.getLoggedUserData().userId);
            console.log(votedUsersArr);

            if (sessionStorage.getItem('PPUser') != null && sessionStorage.getItem('PPUser') != undefined) {
                if (albumOwnerId != loggedUserId) {

                    if (votedUsers.indexOf(loggedUserId) === -1) {
                        $uploadVoteBtn.removeAttr('disabled');
                    } else {

                        $uploadVoteBtn.attr('disabled','disabled');
                    }
                    $parentFieldSet.append($voteElements);


                    $uploadVoteBtn.on('click', function (ev) {
                        ev.preventDefault();
                        var btn_this
                        voteController.Vote(albumId,$selectedVoteValue).then(
                            function (data) {

                                albumController.updateAlbum(albumId,loggedUserId).then(
                                    function (data) {
                                        console.log(data);
                                        alert('hee');
                                        $(btn_this).attr('disabled','disabled');
                                    },
                                    function (error) {
                                        console.log(error);
                                    }

                                )

                            },
                            function (error) {
                                console.log(error);

                            }
                        )

                    })
                }
            }
        }

        View.prototype.generateVoteElements = function () {
            var $voteWrapper = $('<div/>').attr('id', 'vote-album-wrapper'),
                $voteSelect = $('<select/>').attr('id', 'vote-select').appendTo($voteWrapper),
                $uploadVoteBtn = $('<button>Vote</button>').attr('id', 'upload-album-vote-btn').appendTo($voteWrapper),
                $option;

            for (var i = 0; i <= 10; i++) {
                $option = $('<option>' + i + '<option/>').attr('value', i);
                $voteSelect.append($option);
            }
            return $voteWrapper;
        }



        // TODO event functions



// TODO check  getLoggedUserData, visualizate Photos.Albums ------> oconne
        View.prototype.ListAlbumsByUserLogged = function () {

            var checkLoggedUser = userController.getLoggedUserData(),
                _this = this;

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
                            _this.logout();
                        });
                    }


                    albumController.getAlbumsByUserId(checkLoggedUser.userId).then(
                        function success(data) {
                            //  alert(JSON.stringify(data));
                            var $buttonAddAlbum = $('<button>Add Album</button>');
                            var $buttonRemoveAlbum = $('<button>Del</button>');

                            $buttonAddAlbum.on('click', addAlbum);
                            $buttonRemoveAlbum.on('click', delAlbum);

                            function addAlbum() {
                                var storedData= $(this).parent().parent().data('catNam');

                                var userChoiceToAdd=prompt('Add Album to ' + storedData.catName + '?','album name');

                                if(userChoiceToAdd){
                                    var $del=$('<button>Del</button>');
                                    $del.on('click', delAlbum);
                                    $(this).parent().append($('<li class="albumUser">' + userChoiceToAdd + '</li>').append($del));
                                  //  alert(storedData.catID);
                                    albumController.addAlbumByUserCategoryACL(checkLoggedUser.userId,  storedData.catID, userChoiceToAdd ).then(
                                        function success(data){
                                            alert('success');
                                        },  function error(error) {
                                            console.log(error);
                                            alert('error');
                                        }
                                    );

                                    // alert('Added'); must create success function here again
                                }

                            }

                            function delAlbum() {
                                var storedData=$(this).parent().data('storedData');
                                var userChoiceToDelete=confirm('Remove Album ' + storedData.album +' from '+storedData.ctgr+ '?');
                                if(userChoiceToDelete){
                                    $(this).parent().remove();

                                    // alert('Deleted'); must create success function here again
                                }
                            }



                            var $myAlbums = $('<ul class="albums">').append('<li><h3>My Albums</h3></li>').insertBefore('#imagesView');
                            var $Nature = $('<ul class="albumNature">').append('<li class="categoryName">Nature</li>').data('catNam', {catName:'Nature',catID:'atjNCxskH0'}).appendTo($myAlbums);
                            var $Celebs = $('<ul class="albumCelebs">').append('<li class="categoryName">Celebs</li>').data('catNam', {catName:'Celebs',catID:'9khttnVCFu'}).appendTo($myAlbums);
                            var $Others = $('<ul class="albumOthers">').append('<li class="categoryName">Others</li>').data('catNam', {catName:'Others',catID:'riejogx9tp'}).appendTo($myAlbums);
                            var $Team = $('<ul class="albumTeam">').append('<li class="categoryName">TEAM</li>').data('catNam', {catName:'Team',catID:'0ugJttt5gB'}).appendTo($myAlbums);
                            var $Events = $('<ul class="albumEvents">').append('<li class="categoryName">Eventss</li>').data('catNam',{catName: 'Events',catID:'3pc17xjC46'}).appendTo($myAlbums);
                            var $City = $('<ul class="albumCity">').append('<li class="categoryName">City</li>').data('catNam', {catName:'City',catID:'HJCuI6GLfH'}).appendTo($myAlbums);

                            $('.categoryName').append($buttonAddAlbum);

                            $.each(data.results, function (index, object) {

                                var localData= {album: object.albumName, ctgr:object.categoryId.categoryName,albumID:object.objectId,ctgrID:object.categoryId.objectId};

                                switch (object.categoryId.categoryName) {
                                    case 'Nature':

                                        $Nature.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;
                                    case 'Celebrities':
                                        $Celebs.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;
                                    case 'Others':
                                        $Others.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;
                                    case 'The Team':
                                        $Team.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;
                                    case 'Events':
                                        $Events.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;
                                    case 'City sightseeing':
                                        $City.append($('<li class="albumUser">' + object.albumName + '</li>').data('storedData', localData));
                                        break;

                                }
                                //alert(object.albumName+"--"+object.categoryId.categoryName);
                            });

                            $('.albumUser').append($buttonRemoveAlbum);


                        },
                        function error(error) {
                            console.log(error);

                        }
                    );
                }
            }
        }

        console.log(View);
        console.log(View.prototype);


        return new View();
    }
)
;
