define(['repository',], function (repository) {

    function BaseController() {

    }

    BaseController.prototype.contentTypes = {
        JSON: 'application/json',
        IMAGE_JPEG: 'image/jpeg'
    }

    BaseController.prototype.repository = repository.get('https://api.parse.com/1/');


    return BaseController;
});
