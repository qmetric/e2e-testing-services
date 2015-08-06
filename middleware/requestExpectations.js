'use strict';

var requestReader = require('./requestReader');
var Q = require('q');
var _ = require('underscore');

var expectNextRequestMiddleware = function () {
    var grunt = null;

    var expectedNextRequest = null;
    var expectedNextRequestUrl = null;

    var prepareForNextRequest = function(request) {
        var deferredPreparation = Q.defer();
        requestReader.readRequestBody(request).then(function(requestBody) {
            if(!requestBody) {
                return deferredPreparation.reject('The request payload cant be empty');
            }
            expectedNextRequest = requestBody;
            deferredPreparation.resolve();
        });
        return deferredPreparation.promise;
    };

    var isNextRequestExpected = function(request) {
        var deferredCheck = Q.defer();

        requestReader.readRequestBody(request).then(function(requestBody) {
            var isBodyExpected = _.isEqual(expectedNextRequest, requestBody);
            if(isBodyExpected) {
                deferredCheck.resolve();
            } else {
                deferredCheck.reject();
            }
        });

        return deferredCheck.promise;
    };

    var prepareForNextRequestUrl = function(request) {
        requestReader.readRequestBody(request).then(function(requestBody) {
            if(!requestBody.expectedNextUrl) {
                throw new Error('The request has to contain "expectedNextUrl" field.');
            }
            expectedNextRequestUrl = requestBody.expectedNextUrl;
        });
    };

    var isNextUrlExpected = function(url) {
        var wasGivenUrlExpected = url.indexOf(expectedNextRequestUrl) > -1;
        expectedNextRequestUrl = null;
        return wasGivenUrlExpected;
    };

    return function(_grunt_) {
        grunt = _grunt_;

        return function(request, response, next) {
            var returnWithError = function() {
                response.writeHead(500);
                response.end();
            };

            var returnWithSuccess = function() {
                response.writeHead(200);
                response.end();
            };

            var filePath = '.' + request.url;

            if (request.url.indexOf('expect-next-request-body') > -1) {
                return prepareForNextRequest(request).then(function() {
                    returnWithSuccess();
                }, returnWithError);
            }

            if (request.url.indexOf('expect-next-request-url-contains') > -1) {
                prepareForNextRequestUrl(request);
            }

            if (expectedNextRequestUrl && !isNextUrlExpected(request.url)) {
                return next();
            }

            if (expectedNextRequest) {
                isNextRequestExpected(request)
                    .then(function() {
                        if (grunt.file.exists(filePath)) {
                            response.end(grunt.file.read(filePath));
                        } else {
                            next();
                        }
                    })
                    .catch(returnWithError)
                    .fin(function() {
                        expectedNextRequest = null;
                    });
            } else {
                next();
            }
        };
    };
};

module.exports = expectNextRequestMiddleware;
