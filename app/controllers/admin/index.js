
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = module.parent.require('dioscouri-core');

var viewsPath = require("path").join(__dirname, '..', '..', 'views');

/**
 *  PagesAdminController controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class PagesAdminController extends DioscouriCore.Controller {

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {

        if (!this.isAuthenticated()) {
            this.terminate();
            this.response.redirect('/admin/login');
            return dataReadyCallback(null);
        }

        // Set page data
        this.data.header = "Admin Dashboard - Pages";

        /**
         * Set output view object
         */
        this.view(DioscouriCore.View.htmlView(viewsPath + '/admin/index.swig'));
        this.view(DioscouriCore.ModuleView.htmlView(viewsPath + '/admin/index.swig'));

        // Send DATA_READY event
        dataReadyCallback(null);
    }

};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function(request, response) {
    var controller = new PagesAdminController(request, response);
    controller.run();
};
