
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get|/admin/pages': 'admin/index.js',
        'get,post|/admin/page/:action': 'admin/index.js',
        'get,post|/admin/page/:id/:action': 'admin/index.js',

        'get|/admin/pages/categorys': 'admin/categories.js',
        'get,post|/admin/pages/category/:action': 'admin/categories.js',
        'get,post|/admin/pages/category/:id/:action': 'admin/categories.js'
    };

    return routes;
};
