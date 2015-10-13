
// Using STRICT mode for ES6 features
"use strict";

/**
 * Path module
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

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

        /***
         * Location of views
         * @type {string}
         * @private
         */
        this._viewsPath = path.join(__dirname, '..', '..', 'views');
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {
        var that = this;
        // Set page data
        that.data.header = "Pages";
        that.data.param = this.request.params.id;

        var model = DioscouriCore.ApplicationFacade.instance.registry.load('Pages.Models.Page');

        /**
         * Set output view object
         */
        that.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/front/index.swig'));

        model.findOne({slug: this.data.param}, function(error, document){
            if (document && document.content) {
                that.data.header = document.title;
                that.data.pageContent = document.content;
            }

            dataReadyCallback(error);
        });
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
