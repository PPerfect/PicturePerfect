(function () {

    require.config({

        paths: {
            "jquery": "lib/jquery-2.1.1.min",
            //"extender": "controllers/extends-helper",
            "requestsExecutor": "request-executor",
            "repository": "repository",
            "baseController": "controllers/base-controller",
            "photoController": "controllers/photo-controller",
            "albumController": "controllers/albumController",
            "view": "view"
        }

    });


    require(["jquery", "requestsExecutor", "repository", "photoController", "albumController", "view"],
        function ($, reqExecutor, repo, photoController, albumController, view) {

            $('html').append('Hello requireJs!');
            // console.log(extender);
            // alert(extender)
            //  extender.attachExtendsFunction();
            // console.log(view);

            view.listAllPhotos();
            view.listAllAlbums();
        })
}());