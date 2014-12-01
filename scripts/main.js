(function () {

    require.config({

        paths: {
            "jquery": "lib/jquery-2.1.1.min",

            "extender": "extends-helper",
            "requestsExecutor": "request-executor",
            "repository": "repository",
            "baseController": "base-controller",
            "photoController": "photo-controller",

            "view": "view"
        }

    });


    require(["jquery", "requestsExecutor", "repository", "photoController", "view", 'extender'], function ($, reqExecutor, repo, photoController, view, extender) {

        $('html').append('Hello requireJs!');
       // console.log(extender);
       // alert(extender)
        //  extender.attachExtendsFunction();
       // console.log(view);

        view.listAllPhotos();
    })
}());