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
            "categoryController": "controllers/category-controller",
            "userController": "controllers/user-controller",
            "commentController": "controllers/comment-controller",
            "voteController": "controllers/vote-controller",
            "view": "view"
        }
    });


    require(["jquery", "requestsExecutor", "repository", "photoController", "albumController", "categoryController", "userController", "commentController", "view"],
        function ($, reqExecutor, repo, photoController, albumController, categoryController, userController, commentController, view) {

            if (!userController.getLoggedUserData()) {
                view.loadRegisterLink('#top-nav ul');
                view.loadLoginLink('#top-nav ul');
            } else{
                view.ListAlbumsByUserLogged();
            }

            view.loadLastAddedAlbums(6);
            view.loadTopAlbums(6);



         //   view.listAllPhotos();
           // view.listAllAlbums();
            view.listAllCategories();

            //TODO call check function oconne;
            view.ListAlbumsByUserLogged();
          //  view.uploadImage();

            view.attachClickOnCategory();
            view.attachClickOnAlbum();
            view.attachClickOnPhoto();
            view.eventsListener();
        });
}());