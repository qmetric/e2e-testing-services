'use strict';

var overrides = require('./middleware/overrides');
var cleanGetParameters = require('./middleware/cleanGetParameters');
var RequestExpectations = require('./middleware/requestExpectations');
var RequestReader = require('./middleware/requestReader');
var BackendDriver = require('./protractor/BackendDriver');
var Wait = require('./protractor/Wait');

module.exports = {
    protractor: function () {
        return {
            backendDriver: function () {
                return new BackendDriver();
            },
            wait: function () {
                return new Wait();
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
            requestExpectations: function () {
                return RequestExpectations();
            },
            cleanGetParameters: function () {
                return cleanGetParameters;
            }
        }
    }
};