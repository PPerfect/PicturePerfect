(function () {

    require.config({

        paths: {
            "jquery": "lib/jquery-2.1.1.min",
            //"notify": "lib/jquery.noty.packaged.min.js",
            //"extender": "controllers/extends-helper",
            "requestsExecutor": "request-executor",
            "repository": "repository",
            "baseController": "controllers/base-controller",
            "photoController": "controllers/photo-controller",
            "albumController": "controllers/album-controller",
            "userController": "controllers/user-controller",
            "view": "view"
        }
        //,
        //waitSeconds: 15
    });


    require(["jquery", "requestsExecutor", "repository", "photoController", "albumController", "userController", "view"],
        function ($, reqExecutor, repo, photoController, albumController, userController, view) {

            $('html').append('Hello requireJs!');
            // console.log(extender);
            // alert(extender)
            //  extender.attachExtendsFunction();
            // console.log(view);
            userController.login('zkalev', '123123');
            view.listAllPhotos();
            view.listAllAlbums();
        })
}());