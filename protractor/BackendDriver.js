/* global browser */
'use strict';

var BackendDriver = function () {
    var sendPostRequest = function(url, payload, errorHandler) {
        return browser.driver.executeAsyncScript(function(url, payload) {
            var callback = arguments[arguments.length - 1];
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    callback();
                }
            };
            xhr.send(payload);
        }, url, JSON.stringify(payload)).then(null, errorHandler);
    };

    return {
        sendPostRequest: sendPostRequest,
        expectNextRequestBodyToEqual: function(expectedBody) {
            return sendPostRequest('/expect-next-request-body', expectedBody, function() {
                console.error('expectNextRequestBodyToEqual has failed');
            });
        },
        expectNextRequestUrlToContain: function(expectedPartOfNextUrl) {
            return sendPostRequest('/expect-next-request-url-contains', { expectedPartOfNextUrl: expectedPartOfNextUrl }, function() {
                console.error('expectNextRequestUrlToContain has failed');
            });
        },
        overridePath: function(from, to) {
            return sendPostRequest('/override', {
                from: from,
                to: to
            }, function() {
                console.error('overridePath has failed');
            });
        }
    };
};

module.exports = BackendDriver;
