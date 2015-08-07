'use strict';

module.exports = function(grunt) {
    return function(request, response, next) {
        if(request.method !== 'GET') {
            var filePath = '.' + request.url;

            if(grunt.file.exists(filePath)) {
                return response.end(grunt.file.read(filePath));
            }
        }
        next();
    };
};
