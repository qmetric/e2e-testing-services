/* global browser, protractor, element, by */
'use strict';


var valueOf = function(elementFinder, expectedValue) {
    return function() {
        return elementFinder.getAttribute('value').then(function(value) {
            return value === expectedValue;
        });
    };
};

module.exports = {
    forElementToBeRendered: function(locator, time) {
        var timeToWait = time || 3000;
        return browser.wait(protractor.ExpectedConditions.presenceOf(element(locator)), timeToWait, 'Timed out while waiting for ' + locator.toString() + ' to be rendered');
    },
    forElementToBeDisplayed: function(locator) {
        var timeToWait = time || 3000;
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element(locator)), timeToWait, 'Timed out while waiting for ' + locator.toString() + ' to be displayed');
    },
    forElementValueToBe: function(elementFinder, expectedValue) {
        var timeToWait = time || 3000;
        return browser.wait(valueOf(elementFinder, expectedValue), timeToWait, 'Timed out while waiting for ' + elementFinder.locator().value + ' value change');
    }
};
