define(['baseController'], function (baseController) {

    'use strict';

    function CategoryController() {

    }

    CategoryController.prototype = Object.create(baseController.prototype);

    CategoryController.prototype.getAllCategories = function () {
        
        var defer = $.Deferred();

        this.repository.categories.getAll(
            function success(data) {
                defer.resolve(data);
            },
            function error(error) {
                defer.reject(error);
            }
        );

        return defer.promise();
    }

    return new CategoryController();
});