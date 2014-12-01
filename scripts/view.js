define(['photoController'], function (photoController) {

    'use strict';

    function View() {

    }

    View.prototype.listAllPhotos = function listAllPhotos() {
        console.log(photoController);

       //TODO use promises
        photoController.getAllPhotos(resolveResult);
        //.than(
        //    function success(data) {
        //
        //        console.log(data);
        //
        //    }, function error(error) {
        //    });
    }
//testing
    function resolveResult(data) {
        console.log(data);
        console.log(data.results);
       var $ul= $('<ul/>').appendTo(document.body);
        $.each(data.results,function(index,value){
            $('<li>'+value.photoName+'</li>').appendTo($ul);

        })
    }

    console.log(View);
    console.log(View.prototype);
    return new View();
});
