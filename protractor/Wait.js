/* global browser, protractor, element, by */
'use strict';

var ExpectedConditions = protractor.ExpectedConditions;

module.exports = {
    forElementToBeRendered: function(locator, time) {
        var timeToWait = time || 3000;
        return browser.wait(protractor.ExpectedConditions.presenceOf(element(locator)), timeToWait, 'Timed out while waiting for ' + locator.toString() + ' to be rendered');
    },
    forElementToBeDisplayed: function(locator, time) {
        var timeToWait = time || 3000;
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element(locator)), timeToWait, 'Timed out while waiting for ' + locator.toString() + ' to be displayed');
    },
    forElementValueToBe: function(elementFinder, expectedValue, time) {
        var timeToWait = time || 3000;
        return browser.wait(ExpectedConditions.textToBePresentInElementValue(elementFinder, expectedValue), timeToWait, 'Timed out while waiting for ' + elementFinder.locator().value + ' value change');
    },
    forElementContentsToBe: function(elementFinder, expectedContents, time) {
        var timeToWait = time || 3000;
        return browser.wait(ExpectedConditions.textToBePresentInElementValue(elementFinder, expectedContents), timeToWait, 'Timed out while waiting for ' + elementFinder.locator().value + ' value change');
    }
};
