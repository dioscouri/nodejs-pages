
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

var viewsPath = require("path").join(__dirname, '..', '..', 'views');

/**
 *  Base application controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class PagesFrontController extends DioscouriCore.Controller {
    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {

        // Set page data
        this.data.header = "Merchant Web";

        /**
         * Set output view object
         */
        this.view(DioscouriCore.View.htmlView(viewsPath + '/front/index.swig'));


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
    var controller = new PagesFrontController(request, response);
    controller.run();
};
