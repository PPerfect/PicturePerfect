define(['photoController'], function (photoController) {

    'use strict';

    function View() {

    }

    View.prototype.listAllPhotos = function listAllPhotos() {
        console.log(photoController);


        photoController.getAllPhotos(resolveResult);
        //.than(
        //    function success(data) {
        //
        //        console.log(data);
        //
        //    }, function error(error) {
        //    });
    }

    function resolveResult(data) {
        console.log(data);
        console.log(data.results);
    }

    console.log(View);
    console.log(View.prototype);
    return new View();
});
