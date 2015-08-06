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
        }, url, payload).then(null, errorHandler);
    };

    return {
        expectNextDocumentActionToBeMTA: function() {
            return sendPostRequest('/service/policy/expect-next-request-url-contains', '{ "expectedNextUrl": "mta" }', function() {
                console.error('expectNextDocumentActionToBeMTA has failed');
            });
        },
        expectNextDocumentActionToBePurchase: function() {
            return sendPostRequest('/service/policy/expect-next-request-url-contains', '{ "expectedNextUrl": "purchase" }', function() {
                console.error('expectNextDocumentActionToBePurchase has failed');
            });
        },
        expectNextRequestBodyToEqual: function(expectedBody) {
            return sendPostRequest('/expect-next-request', JSON.stringify(expectedBody), function() {
                console.error('expectNextRequestBodyToEqual has failed');
            });
        },
        overridePath: function(from, to) {
            return sendPostRequest('/override', JSON.stringify({
                from: from,
                to: to
            }), function() {
                console.error('overridePath has failed');
            });
        }
    };
}

module.exports = BackendDriver;
