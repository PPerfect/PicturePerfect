define(['photoController', 'albumController', 'categoryController', 'userController'],
    function (photoController, albumController, categoryController, userController) { // added categoryController

        'use strict';

        //TODO we should take decision whether to separate the view

        function View() {

        }

        View.prototype.loadRegisterLink = function loadRegisterLink(linkParent, registerFormParent) {
            var _this = this;
            $(linkParent).append($('<li />').append($('<a href="#register" id="reg-link">Register</a>')));

            $('#reg-link').on('click', function (ev, registerFormParent) {
              //  _this.loadUserRegisterForm(registerFormParent);
            });
        };

        View.prototype.loadLoginLink = function loadLoginLink(selector) {
            $(selector).append($('<li />').append($('<a href="#login">Login</a>')));
        };

        View.prototype.loadLogoutLink = function loadLogoutLink(selector) {
            $(selector).append($('<li />').append($('<a href="">Logout</a>')));
        };

        View.prototype.loadUserRegisterForm = function loadUserRegisterForm(selector) {
            $(selector).append($('<form id="register" action=""></form>')
                .append($('<label>username <input type="text" id="username-reg-input" class="register-input"/></label>'))
                .append($('<label>password <input type="text" id="password-reg-input" class="register-input"/></label>'))
                .append($('<label>repeat password <input type="text" id="username-repeat-input" class="register-input"/></label>')));

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
                    // alert(JSON.stringify(data)); // TODO remove this it checks that the request is working
                    $.each(data.results, function (index, value) {
                        var name = value.albumName;
                        $('<div>')
                            .text(name)
                            .css('color', 'red')
                            .appendTo($('body')); // TODO fix it harcoded body
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
