define(['extender', 'baseController'], function (extender, baseController) {

    'use strict';

    function PhotoController() {

    }

    //PhotoController.extends(baseController);

    PhotoController.prototype = Object.create(baseController.prototype);


    PhotoController.prototype.getAllPhotos = function (resolveResult) {
        console.log(this.repository.photos)
        //  var defer = $.Deferred();
        this.repository.photos.getAll(this.contentTypes.JSON,
            function success(data) {
                console.log(data + ' dataaaa in controller');
                resolveResult(data);
            },
            function error(error) {
               // resolveResult(error);
                console.log(error + ' error in controller');
                console.log(error );

            }
        )
        //  return 'hello';
    }

    return new PhotoController();
});