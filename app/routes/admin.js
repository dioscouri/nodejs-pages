
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get|/admin/pages': 'admin/index.js',
        'get,post|/admin/pages/:action': 'admin/index.js',
        'get,post|/admin/pages/:id/:action': 'admin/index.js',

        'get|/admin/pages/categories': 'admin/categories.js',
        'get,post|/admin/pages/categories/:action': 'admin/categories.js',
        'get,post|/admin/pages/categories/:id/:action': 'admin/categories.js'
    };

    return routes;
};
