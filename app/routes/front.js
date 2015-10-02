
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get|/': 'front/index.js',
        'get|/:id': 'front/index.js'
    };

    return routes;
};
