define([], function () {

    var PARSE_APPLICATION_ID = 'yXjxSDbNHW3w3rBzf4TuM0rGrvtrLvGs3hd7g1pV',
        PARSE_REST_API_KEY = '0tFoO1UlPQn4q7CPi5LrXMgbrGne1cUGFFFXkSlD';

    var makeRequest = function (method, url, contentType, data, success, error) {

        $.ajax({
            headers: {
                "X-Parse-Application-Id": PARSE_APPLICATION_ID,
                'X-Parse-REST-API-Key': PARSE_REST_API_KEY
            },
            method: method,
            url: url,
            contentType: contentType,
            data: data,
            success: success,
            error: error
        });
    }

    var makeGetRequest = function (url, contentType, success, error) {
        makeRequest('GET', url, contentType, null, success, error);
    }

    var makePostRequest = function (url, contentType, data, success, error) {
        makeRequest('POST', url, contentType, data, success, error);
    }

    var makeDeleteRequest = function (url, success, error) {
        makeRequest('DELETE', url, 'application/json', null, success, error);
    }

    var makePutRequest = function (url, contentType, data, success, error) {
        makeRequest('PUT', url, contentType, data, success, error);
    }

    return {
        get: makeGetRequest,
        post: makePostRequest,
        delete: makeDeleteRequest,
        put: makePutRequest
    }
})
