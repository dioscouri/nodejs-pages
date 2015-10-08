
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = module.parent.require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  PagesAdminController controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class PagesAdminController extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../../models/page.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/page';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = '';
    }



    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.title = this.request.body.title;
        result.url = this.request.body.url;

        return result;
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
