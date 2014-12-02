define(['photoController', 'albumController', 'categoryController'], function (photoController, albumController, categoryController) { // added categoryController

    'use strict';

    //TODO we should take decision whether to separate the view

    function View() {

    }

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

    View.prototype.listAllAlbums = function () {

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
    
    View.prototype.listAllCategories = function () {
        
        categoryController.getAllCategories().then(
            function success(data) {
               var $ul = $('<ul></ul>').css('color', 'red'); // TODO remove css, and make mindfull view
                $.each(data.results, function (index, value) {
                    $('<li>' + value.categoryName + '</li>').appendTo($ul);
                });

                $ul.appendTo($('#imagesView'));
            }, function error(error) {
                console.log(error);
            });
    }

    console.log(View);
    console.log(View.prototype);


    return new View();
});
