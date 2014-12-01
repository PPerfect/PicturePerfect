define(['repository',], function (repository) {

    function BaseController() {

    }

    BaseController.prototype.repository = repository.get('https://api.parse.com/1/');

    BaseController.prototype.notify = function () {


    }


    return BaseController;
});
