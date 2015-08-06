'use strict';

var requestReader = require('./requestReader');
var url = require('url');

var overridePathOnce = function () {
    var overrides = {};
    var overridePathOnce = function(request, response, next) {
        var uri = url.parse(request.url).pathname;

        if(request.url === '/override') {
            return requestReader.readRequestBody(request)
                .then(function(requestBody) {
                    overrides[requestBody.from] = requestBody.to;
                    response.end();
                });
        }

        if(overrides[uri]) {
            request.url = overrides[uri];
            delete overrides[uri];
        }

        next();
    };

    return overridePathOnce;
};

module.exports = overridePathOnce;
