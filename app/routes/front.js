
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get|/pages': 'front/index.js',
        'get|/pages/categories': 'front/categories.js',
        'get|/pages/categories/:slug': 'front/categories.js',
        'get|/pages/:slug': 'front/index.js'
    };

    return routes;
};