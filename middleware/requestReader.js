'use strict';

var Q = require('q');

module.exports = {
    readRequestBody: function(request) {
        var deferredRead = Q.defer();
        var jsonString = '';

        request.on('data', function (data) {
            jsonString += data;
        });
        request.on('end', function () {
            deferredRead.resolve(JSON.parse(jsonString));
        });

        return deferredRead.promise;
    }
};