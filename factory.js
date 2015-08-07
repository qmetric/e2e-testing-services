'use strict';

var overrides = require('./middleware/overrides');
var cleanGetParameters = require('./middleware/cleanGetParameters');
var requestExpectations = require('./middleware/requestExpectations');
var RequestReader = require('./middleware/requestReader');
var handleNonGetRequests = require('./middleware/handleNonGetRequests');
var BackendDriver = require('./protractor/BackendDriver');
var Wait = require('./protractor/Wait');

module.exports = {
    protractor: function () {
        return {
            backendDriver: function () {
                return BackendDriver();
            },
            wait: function () {
                return Wait();
            }
        }
    },
    middleware: function () {
        return {
            overrides: function () {
                return overrides();
            },
            requestReader: function () {
                return RequestReader;
            },
            requestExpectations: function (grunt) {
                return requestExpectations()(grunt);
            },
            cleanGetParameters: function () {
                return cleanGetParameters;
            },
            handleNonGetRequests: function (grunt) {
                return handleNonGetRequests(grunt);
            }
        }
    }
};
