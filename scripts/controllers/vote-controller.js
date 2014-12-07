define(['baseController'], function (baseController) {

    'use strict';

    function VoteController() {

    }

    VoteController.prototype = Object.create(baseController.prototype);

    VoteController.prototype.getVotesWithAlbums = function getVotesWithAlbums() {
        var defer = $.Deferred();

        this.repository.votes.getVotesWithAlbums(
            function success(data) {
                defer.resolve(data);
            },
            function error(err) {
                defer.reject(err);
            }
        );

        return defer.promise();
    };


    return new VoteController();
});
