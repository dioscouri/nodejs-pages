
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get|/admin/pages': 'admin/index.js',
        'get,post|/admin/page/:action': 'admin/index.js',
        'get,post|/admin/page/:id/:action': 'admin/index.js'
    };

    return routes;
};
