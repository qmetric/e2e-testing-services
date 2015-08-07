/* global browser, protractor, element, by */
'use strict';

var attributeOf = function(elementFinder, attributeName, expectedValue, attributeValueParser) {
    return function() {
        return elementFinder.getAttribute(attributeName).then(function(value) {
            if(attributeValueParser) {
                value = attributeValueParser(value);
            }
            return value === expectedValue;
        });
    };
};

var Wait = function () {
    var ExpectedConditions = protractor.ExpectedConditions;

    return {
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
            return browser.wait(ExpectedConditions.textToBePresentInElement(elementFinder, expectedContents), timeToWait, 'Timed out while waiting for ' + elementFinder.locator().value + ' content change');
        },
        forElementAttributeToBe: function(elementFinder, attributeName, expectedValue, attributeValueParser, time) {
            var timeToWait = time || 3000;
            return browser.wait(attributeOf(elementFinder, attributeName, expectedValue, attributeValueParser), timeToWait, 'Timed out while waiting for ' + elementFinder.locator().value + ' attribute ' + attributeName + ' change');
        },
        forStalenessOf: function(elementFinder, time) {
            var timeToWait = time || 3000;
            return browser.wait(protractor.ExpectedConditions.stalenessOf(elementFinder), timeToWait, 'Timed out while waiting for ' + locator.toString() + ' to be stale');
        }
    };
};

module.exports = Wait;
