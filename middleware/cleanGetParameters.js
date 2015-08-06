'use strict';

module.exports = function(request, _, next) {
    request.url = request.url.replace('?', '_').replace('=', '_');
    next();
};